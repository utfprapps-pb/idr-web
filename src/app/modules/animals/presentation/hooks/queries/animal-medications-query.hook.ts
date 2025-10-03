import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalMedicationsUseCase } from '../../../main/factories/use-cases/animal-medications-use-cases'

import type {
  AnimalMedicationFilters,
  AnimalMedicationSort,
} from '../../types/animal-medication-types'

type Props = {
  propertyId: number
  animalId: number
  filters: AnimalMedicationFilters
  page: number
  sort?: AnimalMedicationSort
}

export function useAnimalMedicationsQuery({
  propertyId,
  animalId,
  filters,
  page,
  sort,
}: Props) {
  const getAnimalMedicationsUseCase = makeRemoteGetAnimalMedicationsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalMedications,
  } = useQuery({
    queryKey: ['animal-medications', { page, sort, filters }],
    queryFn: () =>
      getAnimalMedicationsUseCase.execute({
        propertyId,
        animalId,

        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar medicações do animal')
  }, [error, isError])

  return {
    animalMedications: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimalMedications,
  }
}
