import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalPurchasesUseCase } from '../../../main/factories/use-cases/animal-purchases-use-cases'

import type {
  AnimalPurchaseFilters,
  AnimalPurchaseSort,
} from '../../types/animal-purchase-types'

type Props = {
  propertyId: number
  animalId: number
  filters: AnimalPurchaseFilters
  page: number
  sort?: AnimalPurchaseSort
}

export function useAnimalPurchasesQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalPurchasesUseCase = makeRemoteGetAnimalPurchasesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalPurchases,
  } = useQuery({
    queryKey: ['animal-purchases', { page, sort, filters }],
    queryFn: () =>
      getAnimalPurchasesUseCase.execute({
        propertyId,
        animalId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar compras do animal')
  }, [error, isError])

  return {
    animalPurchases: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalPurchases,
  }
}
