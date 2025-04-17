import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalDiseaseUseCase } from '../../../main/factories/use-cases/animal-diseases-use-cases'

type Props = {
  id: string
  propertyId: string
  animalId: string
}

export function useAnimalDiseaseQuery({ id, propertyId, animalId }: Props) {
  const getAnimalDiseaseUseCase = makeRemoteGetAnimalDiseaseUseCase()

  const {
    data: animalDisease,
    isError,
    isLoading,
    refetch: refetchAnimalDisease,
  } = useQuery({
    queryKey: ['animal-disease', id],
    queryFn: () =>
      getAnimalDiseaseUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar doença do animal')
  }, [isError])

  return {
    animalDisease,
    isLoading,
    refetchAnimalDisease,
  }
}
