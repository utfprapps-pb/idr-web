import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalChildBirthsUseCase } from '../../../main/factories/use-cases'

import type { AnimalChildBirthFilters, AnimalChildBirthSort } from '../../types'

type Props = {
  propertyId: string
  animalId: string
  filters: AnimalChildBirthFilters
  page: number
  sort?: AnimalChildBirthSort
}

export function useAnimalChildBirthsQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalChildBirthsUseCase = makeRemoteGetAnimalChildBirthsUseCase()

  const {
    data,
    isError,
    isLoading,
    refetch: refetchAnimalChildBirths,
  } = useQuery({
    queryKey: ['animals', { page, sort, filters }],
    queryFn: () =>
      getAnimalChildBirthsUseCase.execute({
        propertyId,
        animalId,
        queryParams: {
          pagination: { page },
          sort,
          filters,
        },
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar partos do animal')
  }, [isError])

  return {
    animalChildBirths: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalChildBirths,
  }
}
