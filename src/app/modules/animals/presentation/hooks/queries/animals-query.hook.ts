import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalsUseCase } from '../../../main/factories/use-cases'

import type { AnimalFilters, AnimalSort } from '../../types/animal-types'

type Props = {
  propertyId: number
  filters: AnimalFilters
  page: number
  sort?: AnimalSort
}

export function useAnimalsQuery({ propertyId, filters, page, sort }: Props) {
  const getAnimalsUseCase = makeRemoteGetAnimalsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimals,
  } = useQuery({
    queryKey: ['animals', { page, sort, filters }],
    queryFn: () =>
      getAnimalsUseCase.execute({
        propertyId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar animais')
  }, [error, isError])

  return {
    animals: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimals,
  }
}
