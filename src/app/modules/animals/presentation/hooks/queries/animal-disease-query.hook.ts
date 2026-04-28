import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalDiseaseUseCase } from '../../../main/factories/use-cases/animal-diseases-use-cases'

type Props = {
  id: number
  propertyId: number
  animalId: number
}

export function useAnimalDiseaseQuery({ id, propertyId, animalId }: Props) {
  const getAnimalDiseaseUseCase = makeRemoteGetAnimalDiseaseUseCase()

  const {
    data: animalDisease,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalDisease,
  } = useQuery({
    queryKey: ['animal-disease', propertyId, id],
    enabled: !!propertyId && !!id,
    queryFn: () =>
      getAnimalDiseaseUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar doença do animal')
  }, [error, isError])

  return {
    animalDisease,
    isLoading,
    refetchAnimalDisease,
  }
}
