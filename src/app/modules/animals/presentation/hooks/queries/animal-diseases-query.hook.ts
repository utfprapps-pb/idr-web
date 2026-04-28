import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalDiseasesUseCase } from '../../../main/factories/use-cases/animal-diseases-use-cases'

import type {
  AnimalDiseaseFilters,
  AnimalDiseaseSort,
} from '../../types/animal-disease-types'

type Props = {
  propertyId: number
  animalId: number
  filters: AnimalDiseaseFilters
  page: number
  sort?: AnimalDiseaseSort
}

export function useAnimalDiseasesQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalDiseasesUseCase = makeRemoteGetAnimalDiseasesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalDiseases,
  } = useQuery({
    queryKey: ['animal-diseases', propertyId, { page, sort, filters }],
    enabled: !!propertyId,
    queryFn: () =>
      getAnimalDiseasesUseCase.execute({
        propertyId,
        animalId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar doenças do animal')
  }, [error, isError])

  return {
    animalDiseases: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalDiseases,
  }
}
