import { useState, useMemo } from 'react'

import { useAllAnimalsQuery } from '@/app/modules/animals/presentation/hooks/queries/all-animals-query.hook'
import { useDebounce } from '@/core/presentation/hooks'

import type { NutritionalBalancingFormSchema } from '../../validations/nutritional-balancing-form-schema'

type UseAnimalSelectionProps = {
  propertyId: number
  nutritionalBalancings: NutritionalBalancingFormSchema['nutritionalBalancings']
}

export function useNewNutritionalBalancingHeader({
  propertyId,
  nutritionalBalancings,
}: UseAnimalSelectionProps) {
  const [searchAnimal, setSearchAnimal] = useState('')
  const debouncedAnimal = useDebounce({ value: searchAnimal })

  const selectedIds = useMemo(
    () =>
      nutritionalBalancings
        .map((field) => field?.animal?.id)
        .filter((id): id is number => typeof id === 'number' && id > 0),
    [nutritionalBalancings]
  )

  const { allAnimals, isLoading } = useAllAnimalsQuery({
    propertyId,
    filters: {
      name: {
        value: debouncedAnimal,
        type: 'LIKE',
      },
      ...(selectedIds.length
        ? {
            id: {
              value: selectedIds,
              type: 'NOT_IN',
            },
          }
        : {}),
    },
  })

  return {
    searchAnimal,
    setSearchAnimal,
    allAnimals,
    isLoading,
  }
}
