import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalInseminationsUseCase } from '../../../main/factories/use-cases/animal-inseminations-use-cases'

import type {
  AnimalInseminationFilters,
  AnimalInseminationSort,
} from '../../types/animal-insemination-types'

type Props = {
  propertyId: number
  animalId: number
  filters: AnimalInseminationFilters
  page: number
  sort?: AnimalInseminationSort
}

export function useAnimalInseminationsQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalInseminationsUseCase =
    makeRemoteGetAnimalInseminationsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalInseminations,
  } = useQuery({
    queryKey: ['animal-inseminations', propertyId, { page, sort, filters }],
    enabled: !!propertyId,
    queryFn: () =>
      getAnimalInseminationsUseCase.execute({
        propertyId,
        animalId,

        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar inseminações do animal')
  }, [error, isError])

  return {
    animalInseminations: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalInseminations,
  }
}
