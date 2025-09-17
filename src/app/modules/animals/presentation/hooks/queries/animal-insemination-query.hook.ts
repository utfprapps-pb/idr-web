import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalInseminationUseCase } from '../../../main/factories/use-cases/animal-inseminations-use-cases'

type Props = {
  id: number
  propertyId: number
  animalId: number
}

export function useAnimalInseminationQuery({
  id,
  propertyId,
  animalId,
}: Props) {
  const getAnimalInseminationUseCase = makeRemoteGetAnimalInseminationUseCase()

  const {
    data: animalInsemination,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalInsemination,
  } = useQuery({
    queryKey: ['animal-insemination', id],
    queryFn: () =>
      getAnimalInseminationUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar inseminação do animal')
  }, [error, isError])

  return {
    animalInsemination,
    isLoading,
    refetchAnimalInsemination,
  }
}
