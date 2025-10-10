import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalSalesUseCase } from '../../../main/factories/use-cases/animal-sales-use-cases'

import type {
  AnimalSaleFilters,
  AnimalSaleSort,
} from '../../types/animal-sale-types'

type Props = {
  propertyId: number
  animalId: number
  filters: AnimalSaleFilters
  page: number
  sort?: AnimalSaleSort
}

export function useAnimalSalesQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalSalesUseCase = makeRemoteGetAnimalSalesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalSales,
  } = useQuery({
    queryKey: ['animal-sales', { page, sort, filters }],
    queryFn: () =>
      getAnimalSalesUseCase.execute({
        propertyId,
        animalId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar vendas do animal')
  }, [error, isError])

  return {
    animalSales: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalSales,
  }
}
