import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AnimalDataFactory } from '@/main/factories/useCases/animal'

import type { AnimalFilters, AnimalSort } from '../types'

type Props = {
  propertyId: string
  filters: AnimalFilters
  page: number
  sort?: AnimalSort
}

export const useAnimals = ({ propertyId, filters, page, sort }: Props) => {
  const getAnimals = AnimalDataFactory.makeRemoteGetAnimals()

  const {
    data,
    isError,
    isLoading,
    refetch: refetchAnimals,
  } = useQuery({
    queryKey: ['animals', { page, sort, filters }],
    queryFn: () =>
      getAnimals.execute({
        propertyId,
        queryParams: {
          pagination: { page },
          sort,
          filters,
        },
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar animais')
  }, [isError])

  return {
    animals: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimals,
  }
}
