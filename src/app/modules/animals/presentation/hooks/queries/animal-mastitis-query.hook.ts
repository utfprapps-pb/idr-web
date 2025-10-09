import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalMastitisUseCase } from '../../../main/factories/use-cases/animal-mastitides-use-cases'

type Props = {
  id: number
  propertyId: number
  animalId: number
}

export function useAnimalMastitisQuery({ id, propertyId, animalId }: Props) {
  const getAnimalMastitisUseCase = makeRemoteGetAnimalMastitisUseCase()

  const {
    data: animalMastitis,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalMastitis,
  } = useQuery({
    queryKey: ['animal-mastitis', id],
    queryFn: () =>
      getAnimalMastitisUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar mastite do animal')
  }, [error, isError])

  return {
    animalMastitis,
    isLoading,
    refetchAnimalMastitis,
  }
}
