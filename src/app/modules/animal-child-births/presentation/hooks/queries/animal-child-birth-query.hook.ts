import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalChildBirthUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: string
  propertyId: string
  animalId: string
}

export function useAnimalChildBirthQuery({ id, propertyId, animalId }: Props) {
  const getAnimalChildBirthUseCase = makeRemoteGetAnimalChildBirthUseCase()

  const {
    data: animalChildBirth,
    isError,
    isLoading,
    refetch: refetchAnimalChildBirth,
  } = useQuery({
    queryKey: ['animal-child-birth', id],
    queryFn: () =>
      getAnimalChildBirthUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar parto do animal')
  }, [isError])

  return {
    animalChildBirth,
    isLoading,
    refetchAnimalChildBirth,
  }
}
