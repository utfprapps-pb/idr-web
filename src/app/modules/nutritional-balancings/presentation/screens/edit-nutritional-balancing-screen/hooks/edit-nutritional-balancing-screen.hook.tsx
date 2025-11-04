import { useState, useMemo, type ReactNode, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteUpdateNutritionalBalancingUseCase } from '@/app/modules/nutritional-balancings/main/factories'
import { formatNumber } from '@/core/masker'
import { useHookForm } from '@/core/presentation/hooks'

import { useNutritionalBalancingContext } from '../../../hooks/nutritional-balancing-context.hook'
import { useNutritionalBalancingQuery } from '../../../hooks/queries/nutritional-balancing-query.hook'
import { IngredientsTab } from '../../../tabs/ingredients-tab/ingredients-tab'
import { NutritionalEvaluationTab } from '../../../tabs/nutritional-evaluation-tab'
import { SummaryTab } from '../../../tabs/summary-tab'
import { makeAnimalInformationItems } from '../../../utils/make-animal-information-items'
import { makeNutritionalSummaryItems } from '../../../utils/make-nutritional-summary-items'
import {
  nutritionalBalancingFormSchema,
  type NutritionalBalancingFormSchema,
} from '../../../validations/nutritional-balancing-form-schema'

import type { NutritionalBalancingDetailsModel } from '@/app/modules/nutritional-balancings/domain/models/nutritional-balancings-model'

type Tab = {
  key: string
  name: string
  component: ReactNode
}

export function useEditNutritionalBalancingScreen() {
  const {
    propertyId,
    selectedNutritionalBalancing,
    closeEditNutritionalBalancingScreen,
  } = useNutritionalBalancingContext()

  const { nutritionalBalancing, isLoading: isLoadingNutritionalBalancing } =
    useNutritionalBalancingQuery({
      id: selectedNutritionalBalancing?.id ?? 0,
      propertyId,
    })

  const valuesFromApi = useMemo<
    NutritionalBalancingFormSchema | undefined
  >(() => {
    if (nutritionalBalancing) {
      return {
        date: nutritionalBalancing.date,
        nutritionalBalancings: [
          {
            animal: nutritionalBalancing.animal,
            summary: nutritionalBalancing.summary,
            evaluations: nutritionalBalancing.evaluations,
            ingredientGroups: nutritionalBalancing.ingredientGroups.map(
              (group) => ({
                category: group.category,
                ingredients: group.ingredients.map((ingredient) => ({
                  ...ingredient,
                  quantity: formatNumber(ingredient.quantity, {
                    suffix: 'kg',
                  }),
                  type: group.category,
                })),
              })
            ),
          },
        ],
      }
    }
    return undefined
  }, [nutritionalBalancing])

  const form = useHookForm<NutritionalBalancingFormSchema>({
    defaultValues: {
      date: new Date(),
      nutritionalBalancings: [],
    },
    values: valuesFromApi,
    resolver: zodResolver(nutritionalBalancingFormSchema),
  })

  const updateNutritionalBalancingUseCase =
    makeRemoteUpdateNutritionalBalancingUseCase()

  const queryClient = useQueryClient()
  const { mutateAsync: mutateHandleUpdateNutritionalBalancing } = useMutation({
    mutationFn: updateNutritionalBalancingUseCase.execute,
  })

  const [activeTab, setActiveTab] = useState('summary')

  const currentNutritionalBalancingIndex = 0

  const handleUpdateNutritionalBalancing = useCallback(
    async (data: NutritionalBalancingFormSchema) => {
      try {
        if (!selectedNutritionalBalancing?.id) {
          toast.error('Balanceamento nutricional não encontrado')
          return
        }

        const { errors } = form.formState

        const hasIngredientError =
          errors.nutritionalBalancings &&
          Array.isArray(errors.nutritionalBalancings) &&
          errors.nutritionalBalancings.some(
            (balancing) => balancing?.ingredientGroups
          )

        if (hasIngredientError) {
          setActiveTab('ingredients')
          toast.error('Adicione ao menos um ingrediente')
          return
        }

        const nutritionalBalancingData = data.nutritionalBalancings[0]

        if (!nutritionalBalancingData) {
          toast.error('Dados do balanceamento nutricional não encontrados')
          return
        }

        const nutritionalBalancingToUpdate: NutritionalBalancingDetailsModel = {
          date: data.date,
          animal: nutritionalBalancingData.animal,
          summary: nutritionalBalancingData.summary,
          evaluations: nutritionalBalancingData.evaluations,
          ingredientGroups: nutritionalBalancingData.ingredientGroups,
        }

        await mutateHandleUpdateNutritionalBalancing({
          propertyId,
          nutritionalBalancing: {
            id: selectedNutritionalBalancing.id,
            ...nutritionalBalancingToUpdate,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['nutritional-balancings'],
          exact: false,
        })

        toast.success('Balanceamento nutricional foi atualizado com sucesso')

        closeEditNutritionalBalancingScreen()
      } catch {
        toast.error('Erro ao atualizar balanceamento nutricional')
      }
    },
    [
      closeEditNutritionalBalancingScreen,
      form,
      mutateHandleUpdateNutritionalBalancing,
      propertyId,
      queryClient,
      selectedNutritionalBalancing?.id,
    ]
  )

  const handleInvalidSubmit = useCallback(() => {
    const { errors } = form.formState
    const formValues = form.getValues()

    const hasIngredientError =
      errors.nutritionalBalancings &&
      Array.isArray(errors.nutritionalBalancings) &&
      errors.nutritionalBalancings.some(
        (balancing) => balancing?.ingredientGroups
      )

    let firstAnimalWithoutIngredientsIndex = -1
    const hasBalancingWithoutIngredients =
      formValues.nutritionalBalancings &&
      formValues.nutritionalBalancings.some((balancing, index) => {
        const totalIngredients = balancing.ingredientGroups?.reduce(
          (total, group) => total + (group.ingredients?.length || 0),
          0
        )
        const hasNoIngredients = totalIngredients === 0
        if (hasNoIngredients && firstAnimalWithoutIngredientsIndex === -1) {
          firstAnimalWithoutIngredientsIndex = index
        }
        return hasNoIngredients
      })

    if (hasIngredientError || hasBalancingWithoutIngredients) {
      setActiveTab('ingredients')
      toast.error('Adicione ao menos um ingrediente')
      return true
    }

    return false
  }, [form])

  const tabs = useMemo<Tab[]>(
    () => [
      {
        key: 'summary',
        name: 'Visão Geral',
        component: (
          <SummaryTab
            animalInformationItems={makeAnimalInformationItems(
              form,
              currentNutritionalBalancingIndex
            )}
            nutritionalSummaryItems={makeNutritionalSummaryItems(
              form,
              currentNutritionalBalancingIndex
            )}
          />
        ),
      },
      {
        key: 'nutritional-evaluation',
        name: 'Nutrição',
        component: (
          <NutritionalEvaluationTab
            rows={
              form.getValues('nutritionalBalancings')[
                currentNutritionalBalancingIndex
              ]?.evaluations ?? []
            }
          />
        ),
      },
      {
        key: 'ingredients',
        name: 'Ingredientes',
        component: (
          <IngredientsTab
            currentAnimalIndex={currentNutritionalBalancingIndex}
          />
        ),
      },
    ],
    [form, currentNutritionalBalancingIndex]
  )

  const tab = useMemo(() => {
    return tabs.find((tab) => tab.key === activeTab)
  }, [activeTab, tabs])

  const nutritionalBalancings = form.watch('nutritionalBalancings')
  const currentNutritionalBalancing =
    nutritionalBalancings[currentNutritionalBalancingIndex]

  return {
    form,
    tabs,
    tab,
    activeTab,
    setActiveTab,
    currentNutritionalBalancing,
    isLoadingNutritionalBalancing,
    handleUpdateNutritionalBalancing,
    handleInvalidSubmit,
  }
}
