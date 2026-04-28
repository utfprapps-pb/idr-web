import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalDeathUseCase } from '../../../main/factories/use-cases/animal-deaths-use-cases'

type Props = {
  id: number
  propertyId: number
  animalId: number
}

export function useAnimalDeathQuery({ id, propertyId, animalId }: Props) {
  const getAnimalDeathUseCase = makeRemoteGetAnimalDeathUseCase()

  const {
    data: animalDeath,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalDeath,
  } = useQuery({
    queryKey: ['animal-death', propertyId, id],
    enabled: !!propertyId && !!id,
    queryFn: () =>
      getAnimalDeathUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar óbito do animal')
  }, [error, isError])

  return {
    animalDeath,
    isLoading,
    refetchAnimalDeath,
  }
}
