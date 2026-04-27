import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalPregnancyDiagnosisUseCase } from '../../../main/factories/use-cases/animal-pregnancy-diagnoses-use-cases'

type Props = {
  id: number
  propertyId: number
  animalId: number
}

export function useAnimalPregnancyDiagnosisQuery({
  id,
  propertyId,
  animalId,
}: Props) {
  const getAnimalPregnancyDiagnosisUseCase =
    makeRemoteGetAnimalPregnancyDiagnosisUseCase()

  const {
    data: animalPregnancyDiagnosis,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalPregnancyDiagnosis,
  } = useQuery({
    queryKey: ['animal-pregnancy-diagnosis', propertyId, id],
    enabled: !!propertyId && !!id,
    queryFn: () =>
      getAnimalPregnancyDiagnosisUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(
        error?.message ?? 'Erro ao buscar diagnóstico de gestação do animal'
      )
  }, [error, isError])

  return {
    animalPregnancyDiagnosis,
    isLoading,
    refetchAnimalPregnancyDiagnosis,
  }
}
