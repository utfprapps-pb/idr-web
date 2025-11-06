import { useState, useMemo, type ReactNode, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useFieldArray } from 'react-hook-form'
import toast from 'react-hot-toast'

import { makeRemoteCreateNutritionalBalancingUseCase } from '@/app/modules/nutritional-balancings/main/factories'
import { useHookForm } from '@/core/presentation/hooks'

import { useNutritionalBalancingContext } from '../../../hooks/nutritional-balancing-context.hook'
import { NutritionalEvaluationWithIngredientsTab } from '../../../tabs/nutritional-evaluation-with-ingredients-tab'
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
  ] = useState<number | null>(null)

  const {
    fields: nutritionalBalancings,
    append: appendNutritionalBalancing,
    remove: removeNutritionalBalancing,
  } = useFieldArray<NutritionalBalancingFormSchema, 'nutritionalBalancings'>({
    control: form.control,
    name: 'nutritionalBalancings',
  })

  const handleSelectNutritionalBalancing = useCallback((index: number) => {
    setCurrentNutritionalBalancingIndex(index)
  }, [])

  const handleAppendNutritionalBalancingAndSelectLast = useCallback(
    (data: NutritionalBalancingFormSchema['nutritionalBalancings'][number]) => {
      appendNutritionalBalancing(data)
      setCurrentNutritionalBalancingIndex(nutritionalBalancings.length)
    },
    [appendNutritionalBalancing, nutritionalBalancings.length]
  )

  const handleRemoveNutritionalBalancing = useCallback(
    (index: number) => {
      removeNutritionalBalancing(index)

      const isLastItem = nutritionalBalancings.length === 1
      const isRemovingCurrentItem = index === currentNutritionalBalancingIndex
      const isRemovingBeforeCurrentItem =
        currentNutritionalBalancingIndex !== null &&
        index < currentNutritionalBalancingIndex

      if (isLastItem) {
        setCurrentNutritionalBalancingIndex(null)
        return
      }

      if (isRemovingCurrentItem) {
        const newIndex = index > 0 ? index - 1 : 0
        setCurrentNutritionalBalancingIndex(newIndex)
        return
      }

      if (isRemovingBeforeCurrentItem) {
        setCurrentNutritionalBalancingIndex(
          currentNutritionalBalancingIndex - 1
        )
      }
    },
    [
      removeNutritionalBalancing,
      nutritionalBalancings.length,
      currentNutritionalBalancingIndex,
    ]
  )

  const handleCreateNutritionalBalancing = useCallback(
    async (data: NutritionalBalancingFormSchema) => {
      try {
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

        const nutritionalBalancings: NutritionalBalancingDetailsModel[] =
          data.nutritionalBalancings.map((nutritionalBalancing) => {
            return {
              date: data.date,
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
          queryKey: ['nutritional-balancings'],
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

  const handleInvalidSubmit = useCallback(() => {
    const { errors } = form.formState
    const formValues = form.getValues()

    const hasIngredientError =
      errors.nutritionalBalancings &&
      Array.isArray(errors.nutritionalBalancings) &&
      errors.nutritionalBalancings.some(
        (balancing) => balancing?.ingredientGroups
      )

    // Find the first animal without ingredients
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
      if (firstAnimalWithoutIngredientsIndex !== -1) {
        setCurrentNutritionalBalancingIndex(firstAnimalWithoutIngredientsIndex)
      }
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
        component: currentNutritionalBalancingIndex !== null && (
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
        component: currentNutritionalBalancingIndex !== null && (
          <NutritionalEvaluationWithIngredientsTab
            currentAnimalIndex={currentNutritionalBalancingIndex}
            rows={
              form.getValues('nutritionalBalancings')[
                currentNutritionalBalancingIndex
              ]?.evaluations ?? []
            }
          />
        ),
      },
    ],
    [currentNutritionalBalancingIndex, form]
  )

  const tab = useMemo(() => {
    return tabs.find((tab) => tab.key === activeTab)
  }, [activeTab, tabs])

  const currentNutritionalBalancing = useMemo(() => {
    if (
      currentNutritionalBalancingIndex === null ||
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
    handleSelectNutritionalBalancing,
    handleAppendNutritionalBalancing:
      handleAppendNutritionalBalancingAndSelectLast,
    handleRemoveNutritionalBalancing,
    handleCreateNutritionalBalancing,
    handleInvalidSubmit,
  }
}
