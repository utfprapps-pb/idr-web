import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: string
  propertyId: string
}

export function useAnimalQuery({ id, propertyId }: Props) {
  const getAnimalUseCase = makeRemoteGetAnimalUseCase()

  const {
    data: animal,
    isError,
    isLoading,
    refetch: refetchAnimal,
  } = useQuery({
    queryKey: ['animal', id],
    queryFn: () =>
      getAnimalUseCase.execute({
        propertyId,
        animalId: id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar animal')
  }, [isError])

  return {
    animal,
    isLoading,
    refetchAnimal,
  }
}
