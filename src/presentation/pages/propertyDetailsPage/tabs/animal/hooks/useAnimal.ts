import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AnimalDataFactory } from '@/main/factories/useCases/animal'

type Props = {
  id: string
  propertyId: string
}

export const useAnimal = ({ id, propertyId }: Props) => {
  const getAnimal = AnimalDataFactory.makeRemoteGetAnimal()

  const {
    data: animal,
    isError,
    isLoading,
    refetch: refetchAnimal,
  } = useQuery({
    queryKey: ['animal', id],
    queryFn: () =>
      getAnimal.execute({
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
