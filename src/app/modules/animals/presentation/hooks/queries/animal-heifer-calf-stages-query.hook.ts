import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalHeiferCalfStagesUseCase } from '../../../main/factories/use-cases/animal-heifer-calf-stages-use-cases'

import type {
  AnimalHeiferCalfStageFilters,
  AnimalHeiferCalfStageSort,
} from '../../types/animal-heifer-calf-stage-types'

type Props = {
  propertyId: number
  animalId: number
  filters: AnimalHeiferCalfStageFilters
  page: number
  sort?: AnimalHeiferCalfStageSort
}

export function useAnimalHeiferCalfStagesQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalHeiferCalfStagesUseCase =
    makeRemoteGetAnimalHeiferCalfStagesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalHeiferCalfStages,
  } = useQuery({
    queryKey: [
      'animal-heifer-calf-stages',
      propertyId,
      { page, sort, filters },
    ],
    enabled: !!propertyId,
    queryFn: () =>
      getAnimalHeiferCalfStagesUseCase.execute({
        propertyId,
        animalId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar fases de bezerra novilha')
  }, [error, isError])

  return {
    animalHeiferCalfStages: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalHeiferCalfStages,
  }
}
