import {
  useState,
  useMemo,
  type ReactNode,
  useCallback,
  useEffect,
} from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useFieldArray, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useAllAnimalsQuery } from '@/app/modules/animals/presentation/hooks/queries/all-animals-query.hook'
import { makeRemoteCreateNutritionalBalancingUseCase } from '@/app/modules/nutritional-balancings/main/factories'
import { formatNumber } from '@/core/masker'
import { useHookForm } from '@/core/presentation/hooks'

import { useNutritionalBalancingContext } from '../../../hooks/nutritional-balancing-context.hook'
import { useLastVisitNutritionalBalancingsQuery } from '../../../hooks/queries/last-visit-nutritional-balancings-query.hook'
import { NutritionalEvaluationWithIngredientsTab } from '../../../tabs/nutritional-evaluation-with-ingredients-tab'
import { SummaryTab } from '../../../tabs/summary-tab'
import { createEmptyNutritionalBalancingEntry } from '../../../utils/create-empty-nutritional-balancing-entry'
import { makeAnimalInformationItems } from '../../../utils/make-animal-information-items'
import { makeNutritionalSummaryItems } from '../../../utils/make-nutritional-summary-items'
import {
  nutritionalBalancingFormSchema,
  type IngredientGroupSchema,
  type NutritionalBalancingFormSchema,
} from '../../../validations/nutritional-balancing-form-schema'

import type { NutritionalBalancingDetailsModel } from '@/app/modules/nutritional-balancings/domain/models/nutritional-balancings-model'

type Tab = {
  key: string
  name: string
  component: ReactNode
}

export function useNewNutritionalBalancingScreen() {
  const form = useHookForm<NutritionalBalancingFormSchema>({
    defaultValues: {
      date: new Date(),
      nutritionalBalancings: [],
    },
    resolver: zodResolver(nutritionalBalancingFormSchema),
  })

  const { propertyId, closeNewNutritionalBalancingScreen } =
    useNutritionalBalancingContext()

  const createNutritionalBalancingUseCase =
    makeRemoteCreateNutritionalBalancingUseCase()

  const queryClient = useQueryClient()
  const { mutateAsync: mutateHandleCreateNutritionalBalancing } = useMutation({
    mutationFn: createNutritionalBalancingUseCase.execute,
  })

  const [activeTab, setActiveTab] = useState('summary')
  const [
    currentNutritionalBalancingIndex,
    setCurrentNutritionalBalancingIndex,
  ] = useState<number>(0)
  const [animalsLoaded, setAnimalsLoaded] = useState(false)

  const {
    fields: nutritionalBalancings,
    replace: replaceNutritionalBalancings,
  } = useFieldArray<NutritionalBalancingFormSchema, 'nutritionalBalancings'>({
    control: form.control,
    name: 'nutritionalBalancings',
  })

  const watchedNutritionalBalancings = useWatch({
    control: form.control,
    name: 'nutritionalBalancings',
  })

  const { allAnimals, isLoading: isLoadingAnimals } = useAllAnimalsQuery({
    propertyId,
  })

  const { lastVisitData, isLoading: isLoadingLastVisitData } =
    useLastVisitNutritionalBalancingsQuery({
      propertyId,
      enabled: !isLoadingAnimals && allAnimals.length > 0,
    })

  useEffect(() => {
    if (
      !isLoadingAnimals &&
      !isLoadingLastVisitData &&
      allAnimals.length > 0 &&
      !animalsLoaded
    ) {
      const newEntries = allAnimals.map((animal) => {
        const lastVisitAnimal = lastVisitData?.nutritionalBalancings.find(
          (nutritional) => nutritional.animal.id === animal.value
        )

        const baseEntry = createEmptyNutritionalBalancingEntry({
          animal: {
            id: animal.value,
            name: animal.label,
            breed: animal.extraData?.breed ?? '',
            ecc: animal.extraData?.ecc ?? '',
            weight: animal.extraData?.weight ?? '',
            milkProduction: animal.extraData?.milkProduction ?? '',
            estimatedMilkProduction:
              lastVisitAnimal?.animal.estimatedMilkProduction ?? '',
          },
          summary: lastVisitAnimal?.summary,
          evaluations: lastVisitAnimal?.evaluations,
          ingredientGroups: lastVisitAnimal?.ingredientGroups.map((group) => ({
            category: group.category,
            ingredients: group.ingredients.map((ingredient) => ({
              ...ingredient,
              quantity: formatNumber(ingredient.quantity, {
                suffix: 'kg',
              }),
              type: group.category,
            })),
          })) as IngredientGroupSchema[],
        })

        return baseEntry
      })

      replaceNutritionalBalancings(newEntries)

      setAnimalsLoaded(true)
    }
  }, [
    isLoadingAnimals,
    isLoadingLastVisitData,
    allAnimals,
    animalsLoaded,
    replaceNutritionalBalancings,
    lastVisitData,
  ])

  const handleSelectNutritionalBalancing = useCallback((index: number) => {
    setCurrentNutritionalBalancingIndex(index)
  }, [])

  const handleCreateNutritionalBalancing = useCallback(
    async (data: NutritionalBalancingFormSchema) => {
      try {
        const nutritionalBalancings: NutritionalBalancingDetailsModel[] =
          data.nutritionalBalancings.map((nutritionalBalancing) => {
            return {
              date: data.date,
              visitId: data.visitId,
              animal: nutritionalBalancing.animal,
              summary: nutritionalBalancing.summary,
              evaluations: nutritionalBalancing.evaluations,
              ingredientGroups: nutritionalBalancing.ingredientGroups,
            }
          })

        await mutateHandleCreateNutritionalBalancing({
          propertyId,
          nutritionalBalancings,
        })

        queryClient.invalidateQueries({
          queryKey: ['nutritional-balancings', propertyId],
          exact: false,
        })

        toast.success(
          'Cadastro de balanceamento nutricional foi realizado com sucesso'
        )

        form.reset({
          date: new Date(),
          nutritionalBalancings: [],
        })

        closeNewNutritionalBalancingScreen()
      } catch {
        toast.error('Erro ao cadastrar balanceamento nutricional')
      }
    },
    [
      closeNewNutritionalBalancingScreen,
      form,
      mutateHandleCreateNutritionalBalancing,
      propertyId,
      queryClient,
    ]
  )

  const tabs = useMemo<Tab[]>(
    () => [
      {
        key: 'summary',
        name: 'Visão Geral',
        component: currentNutritionalBalancingIndex !== null &&
          watchedNutritionalBalancings[currentNutritionalBalancingIndex] && (
            <SummaryTab
              animalInformationItems={makeAnimalInformationItems(
                watchedNutritionalBalancings[currentNutritionalBalancingIndex]
                  .animal
              )}
              nutritionalSummaryItems={makeNutritionalSummaryItems(
                watchedNutritionalBalancings[currentNutritionalBalancingIndex]
                  .summary
              )}
            />
          ),
      },
      {
        key: 'nutritional-evaluation',
        name: 'Nutrição',
        component: currentNutritionalBalancingIndex !== null && (
          <NutritionalEvaluationWithIngredientsTab
            currentAnimalIndex={currentNutritionalBalancingIndex}
            rows={
              watchedNutritionalBalancings[currentNutritionalBalancingIndex]
                ?.evaluations ?? []
            }
          />
        ),
      },
    ],
    [currentNutritionalBalancingIndex, watchedNutritionalBalancings]
  )

  const tab = useMemo(() => {
    return tabs.find((tab) => tab.key === activeTab)
  }, [activeTab, tabs])

  const currentNutritionalBalancing = useMemo(() => {
    if (
      !nutritionalBalancings.length ||
      currentNutritionalBalancingIndex < 0 ||
      currentNutritionalBalancingIndex >= nutritionalBalancings.length
    ) {
      return null
    }

    return nutritionalBalancings[currentNutritionalBalancingIndex]
  }, [currentNutritionalBalancingIndex, nutritionalBalancings])

  return {
    form,
    tabs,
    tab,
    activeTab,
    setActiveTab,
    currentNutritionalBalancing,
    currentNutritionalBalancingIndex,
    nutritionalBalancings,
    isLoadingAnimals,
    isLoadingLastVisitData,
    allAnimals,
    handleSelectNutritionalBalancing,
    handleCreateNutritionalBalancing,
  }
}
