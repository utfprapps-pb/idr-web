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

type EditingIngredient = {
  category: 'FORAGE' | 'CONCENTRATE' | 'MINERAL'
  index: number
  data: IngredientItemSchema
}

export function useIngredientsContainer({
  currentAnimalIndex,
}: Readonly<UseIngredientsContainerProps>) {
  const form = useFormContext<NutritionalBalancingFormSchema>()

  const [openAddIngredientDialog, setOpenAddIngredientDialog] = useState(false)
  const [editingIngredient, setEditingIngredient] =
    useState<EditingIngredient | null>(null)

  const [searchAnimal, setSearchAnimal] = useState('')
  const [selectedAnimalToCopy, setSelectedAnimalToCopy] =
    useState<Option<number> | null>(null)

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

  useEffect(() => {
    setSearchAnimal('')

    if (currentAnimalIndex === 0 || animalOptions.length === 0) {
      setSelectedAnimalToCopy(null)
      return
    }

    const lastAnimalOption = animalOptions[animalOptions.length - 1]
    if (!lastAnimalOption) return

    setSelectedAnimalToCopy(lastAnimalOption)
  }, [currentAnimalIndex, animalOptions])

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

  const getIngredientPaths = useCallback(
    (category: 'FORAGE' | 'CONCENTRATE' | 'MINERAL') => {
      const ingredientGroupsPath =
        `nutritionalBalancings.${currentAnimalIndex}.ingredientGroups` as const

      const ingredientGroups = form.getValues(ingredientGroupsPath) || []
      const groupIndex = ingredientGroups.findIndex(
        (group) => group.category === category
      )

      if (groupIndex < 0) return null

      const ingredientsPath =
        `${ingredientGroupsPath}.${groupIndex}.ingredients` as const

      return {
        ingredientGroupsPath,
        ingredientsPath,
        groupIndex,
      }
    },
    [currentAnimalIndex, form]
  )

  const handleAddIngredient = useCallback(
    (data: IngredientItemSchema) => {
      const paths = getIngredientPaths(data.type)
      if (!paths) return

      const { ingredientGroupsPath, ingredientsPath } = paths
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
    [form, getIngredientPaths]
  )

  const handleOpenEditIngredient = useCallback(
    (
      category: 'FORAGE' | 'CONCENTRATE' | 'MINERAL',
      ingredientIndex: number
    ) => {
      const paths = getIngredientPaths(category)
      if (!paths) return

      const { ingredientsPath } = paths
      const existingIngredients = form.getValues(ingredientsPath) || []
      const ingredient = existingIngredients[ingredientIndex]

      if (ingredient) {
        setEditingIngredient({
          category,
          index: ingredientIndex,
          data: ingredient,
        })
      }
    },
    [form, getIngredientPaths]
  )

  const handleUpdateIngredient = useCallback(
    (data: IngredientItemSchema) => {
      if (!editingIngredient) return

      const paths = getIngredientPaths(editingIngredient.category)
      if (!paths) return

      const { ingredientGroupsPath, ingredientsPath } = paths
      const existingIngredients = form.getValues(ingredientsPath) || []
      const updatedIngredients = existingIngredients.map((ingredient, index) =>
        index === editingIngredient.index ? data : ingredient
      )

      form.setValue(ingredientsPath, updatedIngredients, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })

      form.trigger(ingredientGroupsPath)
      setEditingIngredient(null)
    },
    [editingIngredient, form, getIngredientPaths]
  )

  const handleRemoveIngredient = useCallback(
    (
      category: 'FORAGE' | 'CONCENTRATE' | 'MINERAL',
      ingredientIndex: number
    ) => {
      const paths = getIngredientPaths(category)
      if (!paths) return

      const { ingredientGroupsPath, ingredientsPath } = paths
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
    [form, getIngredientPaths]
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
    handleOpenEditIngredient,
    handleUpdateIngredient,
    handleRemoveIngredient,
    editingIngredient,
    setEditingIngredient,
  }
}
