import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalDeathsUseCase } from '../../../main/factories/use-cases/animal-deaths-use-cases'

import type {
  AnimalDeathFilters,
  AnimalDeathSort,
} from '../../types/animal-death-types'

type Props = {
  propertyId: number
  animalId: number
  filters: AnimalDeathFilters
  page: number
  sort?: AnimalDeathSort
}

export function useAnimalDeathsQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalDeathsUseCase = makeRemoteGetAnimalDeathsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalDeaths,
  } = useQuery({
    queryKey: ['animal-deaths', propertyId, { page, sort, filters }],
    enabled: !!propertyId,
    queryFn: () =>
      getAnimalDeathsUseCase.execute({
        propertyId,
        animalId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar óbitos do animal')
  }, [error, isError])

  return {
    animalDeaths: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalDeaths,
  }
}
