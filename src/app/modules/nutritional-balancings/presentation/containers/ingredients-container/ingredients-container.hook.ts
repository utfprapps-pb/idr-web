import { useCallback, useEffect, useMemo, useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { onlyNumbersAndDecimalMask } from '@/core/masker'

import type {
  IngredientItemSchema,
  NutritionalBalancingFormSchema,
} from '../../validations/nutritional-balancing-form-schema'
import type { Option } from '@/core/domain/types'

type UseIngredientsContainerProps = {
  currentAnimalIndex: number
}

export function useIngredientsContainer({
  currentAnimalIndex,
}: Readonly<UseIngredientsContainerProps>) {
  const form = useFormContext<NutritionalBalancingFormSchema>()

  const [openAddIngredientDialog, setOpenAddIngredientDialog] = useState(false)

  const [searchAnimal, setSearchAnimal] = useState('')
  const [selectedAnimalToCopy, setSelectedAnimalToCopy] =
    useState<Option<number> | null>(null)

  useEffect(() => {
    setSelectedAnimalToCopy(null)
    setSearchAnimal('')
  }, [currentAnimalIndex])

  const animalsAddedWithIngredients = useMemo(() => {
    const animalsAdded = form.getValues('nutritionalBalancings')
    return animalsAdded
      .map((added, index) => ({ ...added, index }))
      .filter(
        (added) =>
          added.ingredientGroups.length > 0 &&
          added.index !== currentAnimalIndex
      )
  }, [form, currentAnimalIndex])

  const animalOptions = useMemo<Option<number>[]>(() => {
    return animalsAddedWithIngredients.map((animal) => ({
      value: animal.index,
      label: animal.animal.name,
    }))
  }, [animalsAddedWithIngredients])

  const ingredientGroups = form.watch(
    `nutritionalBalancings.${currentAnimalIndex}.ingredientGroups`
  )

  const getIngredients = () => {
    if (!ingredientGroups || ingredientGroups.length === 0) {
      return {
        forage: [],
        concentrate: [],
        mineral: [],
        total: 0,
      }
    }

    const forageGroup = ingredientGroups.find(
      (group) => group.category === 'FORAGE'
    )

    const concentrateGroup = ingredientGroups.find(
      (group) => group.category === 'CONCENTRATE'
    )

    const mineralGroup = ingredientGroups.find(
      (group) => group.category === 'MINERAL'
    )

    const total = ingredientGroups.reduce((acc, group) => {
      return (
        acc +
        group.ingredients.reduce((groupAcc, ingredient) => {
          const cleanValue = onlyNumbersAndDecimalMask(ingredient.quantity)

          return groupAcc + (parseFloat(cleanValue) || 0)
        }, 0)
      )
    }, 0)

    return {
      forage: forageGroup?.ingredients ?? [],
      concentrate: concentrateGroup?.ingredients ?? [],
      mineral: mineralGroup?.ingredients ?? [],
      total,
    }
  }

  const ingredients = getIngredients()

  const handleCopyIngredients = () => {
    if (!selectedAnimalToCopy) return

    const sourceAnimalIndex = selectedAnimalToCopy.value
    const sourceAnimal = form.getValues(
      `nutritionalBalancings.${sourceAnimalIndex}`
    )

    if (sourceAnimal?.ingredientGroups) {
      form.setValue(
        `nutritionalBalancings.${currentAnimalIndex}.ingredientGroups`,
        sourceAnimal.ingredientGroups
      )
      setSelectedAnimalToCopy(null)
    }
  }

  const handleAddIngredient = useCallback(
    (data: IngredientItemSchema) => {
      const ingredientGroupsPath =
        `nutritionalBalancings.${currentAnimalIndex}.ingredientGroups` as const

      const ingredientGroups = form.getValues(ingredientGroupsPath) || []
      const groupIndex = ingredientGroups.findIndex(
        (group) => group.category === data.type
      )

      const ingredientsPath =
        `${ingredientGroupsPath}.${groupIndex}.ingredients` as const
      const existingIngredients = form.getValues(ingredientsPath) || []
      const updatedIngredients = [...existingIngredients, data]

      form.setValue(ingredientsPath, updatedIngredients, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })

      form.trigger(ingredientGroupsPath)
      setOpenAddIngredientDialog(false)
    },
    [currentAnimalIndex, form]
  )

  const handleRemoveIngredient = useCallback(
    (
      category: 'FORAGE' | 'CONCENTRATE' | 'MINERAL',
      ingredientIndex: number
    ) => {
      const ingredientGroupsPath =
        `nutritionalBalancings.${currentAnimalIndex}.ingredientGroups` as const

      const ingredientGroups = form.getValues(ingredientGroupsPath) || []
      const groupIndex = ingredientGroups.findIndex(
        (group) => group.category === category
      )

      if (groupIndex < 0) return

      const ingredientsPath =
        `${ingredientGroupsPath}.${groupIndex}.ingredients` as const
      const existingIngredients = form.getValues(ingredientsPath) || []
      const updatedIngredients = existingIngredients.filter(
        (_, index) => index !== ingredientIndex
      )

      form.setValue(ingredientsPath, updatedIngredients, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })

      form.trigger(ingredientGroupsPath)
    },
    [currentAnimalIndex, form]
  )

  return {
    ingredients,
    searchAnimal,
    setSearchAnimal,
    selectedAnimalToCopy,
    setSelectedAnimalToCopy,
    animalOptions,
    handleCopyIngredients,
    openAddIngredientDialog,
    setOpenAddIngredientDialog,
    handleAddIngredient,
    handleRemoveIngredient,
  }
}
