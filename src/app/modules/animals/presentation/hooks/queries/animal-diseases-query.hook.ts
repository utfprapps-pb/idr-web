import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalDiseasesUseCase } from '../../../main/factories/use-cases/animal-diseases-use-cases'

import type {
  AnimalDiseaseFilters,
  AnimalDiseaseSort,
} from '../../types/animal-disease-types'

type Props = {
  propertyId: string
  animalId: string
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
    isLoading,
    refetch: refetchAnimalDiseases,
  } = useQuery({
    queryKey: ['animal-diseases', { page, sort, filters }],
    queryFn: () =>
      getAnimalDiseasesUseCase.execute({
        propertyId,
        animalId,
        queryParams: {
          pagination: { page },
          sort,
          filters: {
            ...filters,
            diagnosticDate: filters.diagnosticDate
              ? new Date(filters.diagnosticDate).toISOString()
              : undefined,
          },
        },
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar doenças do animal')
  }, [isError])

  return {
    animalDiseases: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalDiseases,
  }
}
