import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalChildbirthUseCase } from '../../../main/factories/use-cases/animal-childbirths-use-cases'

type Props = {
  id: number
  propertyId: number
  animalId: number
}

export function useAnimalChildbirthQuery({ id, propertyId, animalId }: Props) {
  const getAnimalChildbirthUseCase = makeRemoteGetAnimalChildbirthUseCase()

  const {
    data: animalChildbirth,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalChildbirth,
  } = useQuery({
    queryKey: ['animal-childbirth', id],
    queryFn: () =>
      getAnimalChildbirthUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar parto do animal')
  }, [error, isError])

  return {
    animalChildbirth,
    isLoading,
    refetchAnimalChildbirth,
  }
}
