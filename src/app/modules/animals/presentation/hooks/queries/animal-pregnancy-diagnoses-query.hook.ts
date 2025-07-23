import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalPregnancyDiagnosesUseCase } from '../../../main/factories/use-cases/animal-pregnancy-diagnoses-use-cases'

import type {
  AnimalPregnancyDiagnosisFilters,
  AnimalPregnancyDiagnosisSort,
} from '../../types/animal-pregnancy-diagnosis-types'

type Props = {
  propertyId: number
  animalId: number
  filters: AnimalPregnancyDiagnosisFilters
  page: number
  sort?: AnimalPregnancyDiagnosisSort
}

export function useAnimalPregnancyDiagnosesQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalPregnancyDiagnosesUseCase =
    makeRemoteGetAnimalPregnancyDiagnosesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalPregnancyDiagnoses,
  } = useQuery({
    queryKey: ['animal-pregnancy-diagnoses', { page, sort, filters }],
    queryFn: () =>
      getAnimalPregnancyDiagnosesUseCase.execute({
        propertyId,
        animalId,
        pagination: { page },
        sort,
        filters: {
          ...filters,
        },
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(
        error?.message ?? 'Erro ao buscar diagnósticos de gestação do animal'
      )
  }, [error, isError])

  return {
    animalPregnancyDiagnoses: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalPregnancyDiagnoses,
  }
}
