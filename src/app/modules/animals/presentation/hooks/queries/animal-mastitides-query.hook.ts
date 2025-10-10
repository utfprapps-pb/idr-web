import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalMastitidesUseCase } from '../../../main/factories/use-cases/animal-mastitides-use-cases'

import type {
  AnimalMastitisFilters,
  AnimalMastitisSort,
} from '../../types/animal-mastitis-types'

type Props = {
  propertyId: number
  animalId: number
  filters: AnimalMastitisFilters
  page: number
  sort?: AnimalMastitisSort
}

export function useAnimalMastitidesQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalMastitidesUseCase = makeRemoteGetAnimalMastitidesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalMastitides,
  } = useQuery({
    queryKey: ['animal-mastitides', { page, sort, filters }],
    queryFn: () =>
      getAnimalMastitidesUseCase.execute({
        propertyId,
        animalId,

        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar mastites do animal')
  }, [error, isError])

  return {
    animalMastitides: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalMastitides,
  }
}
