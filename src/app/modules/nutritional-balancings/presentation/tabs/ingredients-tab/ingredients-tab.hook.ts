import { useMemo, useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { onlyNumbersMask } from '@/core/masker'

import type { NutritionalBalancingFormSchema } from '../../validations/nutritional-balancing-form-schema'
import type { Option } from '@/core/domain/types'

type UseIngredientsTabProps = {
  currentAnimalIndex: number
}

export function useIngredientsTab({
  currentAnimalIndex,
}: Readonly<UseIngredientsTabProps>) {
  const form = useFormContext<NutritionalBalancingFormSchema>()

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

  const ingredients = useMemo(() => {
    const ingredientGroups =
      form.getValues(
        `nutritionalBalancings.${currentAnimalIndex}.ingredientGroups`
      ) ?? []

    const forageGroup = ingredientGroups?.find(
      (group) => group.category === 'FORAGE'
    )

    const concentrateGroup = ingredientGroups?.find(
      (group) => group.category === 'CONCENTRATE'
    )

    const mineralGroup = ingredientGroups?.find(
      (group) => group.category === 'MINERAL'
    )

    const total = ingredientGroups.reduce((acc, group) => {
      return (
        acc +
        group.ingredients.reduce((groupAcc, ingredient) => {
          return groupAcc + Number(onlyNumbersMask(ingredient.quantity))
        }, 0)
      )
    }, 0)

    return {
      forage: forageGroup?.ingredients ?? [],
      concentrate: concentrateGroup?.ingredients ?? [],
      mineral: mineralGroup?.ingredients ?? [],
      total,
    }
  }, [form, currentAnimalIndex])

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

  return {
    ingredients,
    searchAnimal,
    setSearchAnimal,
    selectedAnimalToCopy,
    setSelectedAnimalToCopy,
    animalOptions,
    handleCopyIngredients,
  }
}
