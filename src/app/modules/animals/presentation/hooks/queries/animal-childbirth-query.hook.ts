import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalChildbirthUseCase } from '../../../main/factories/use-cases/animal-childbirths-use-cases'

type Props = {
  id: string
  propertyId: string
  animalId: string
}

export function useAnimalChildbirthQuery({ id, propertyId, animalId }: Props) {
  const getAnimalChildbirthUseCase = makeRemoteGetAnimalChildbirthUseCase()

  const {
    data: animalChildbirth,
    isError,
    isLoading,
    refetch: refetchAnimalChildbirth,
  } = useQuery({
    queryKey: ['animal-child-birth', id],
    queryFn: () =>
      getAnimalChildbirthUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar parto do animal')
  }, [isError])

  return {
    animalChildbirth,
    isLoading,
    refetchAnimalChildbirth,
  }
}
