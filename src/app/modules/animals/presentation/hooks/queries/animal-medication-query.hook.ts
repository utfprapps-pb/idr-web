import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalMedicationUseCase } from '../../../main/factories/use-cases/animal-medications-use-cases'

type Props = {
  id: number
  propertyId: number
  animalId: number
}

export function useAnimalMedicationQuery({ id, propertyId, animalId }: Props) {
  const getAnimalMedicationUseCase = makeRemoteGetAnimalMedicationUseCase()

  const {
    data: animalMedication,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalMedication,
  } = useQuery({
    queryKey: ['animal-medication', propertyId, id],
    enabled: !!propertyId && !!id,
    queryFn: () =>
      getAnimalMedicationUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar medicação do animal')
  }, [error, isError])

  return {
    animalMedication,
    isLoading,
    refetchAnimalMedication,
  }
}
