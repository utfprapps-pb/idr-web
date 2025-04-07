import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalChildbirthsUseCase } from '../../../main/factories/use-cases/animal-childbirths-use-cases'

import type {
  AnimalChildbirthFilters,
  AnimalChildbirthSort,
} from '../../types/animal-childbirth-types'

type Props = {
  propertyId: string
  animalId: string
  filters: AnimalChildbirthFilters
  page: number
  sort?: AnimalChildbirthSort
}

export function useAnimalChildbirthsQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalChildbirthsUseCase = makeRemoteGetAnimalChildbirthsUseCase()

  const {
    data,
    isError,
    isLoading,
    refetch: refetchAnimalChildbirths,
  } = useQuery({
    queryKey: ['animal-childbirths', { page, sort, filters }],
    queryFn: () =>
      getAnimalChildbirthsUseCase.execute({
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
    animalChildbirths: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalChildbirths,
  }
}
