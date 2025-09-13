import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalHeiferCalfStageUseCase } from '../../../main/factories/use-cases/animal-heifer-calf-stages-use-cases'

type Props = {
  id: number
  propertyId: number
  animalId: number
}

export function useAnimalHeiferCalfStageQuery({
  id,
  propertyId,
  animalId,
}: Props) {
  const getAnimalHeiferCalfStageUseCase =
    makeRemoteGetAnimalHeiferCalfStageUseCase()

  const {
    data: animalHeiferCalfStage,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalHeiferCalfStage,
  } = useQuery({
    queryKey: ['animal-heifer-calf-stage', id],
    queryFn: () =>
      getAnimalHeiferCalfStageUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar fase bezerra novilha')
  }, [error, isError])

  return {
    animalHeiferCalfStage,
    isLoading,
    refetchAnimalHeiferCalfStage,
  }
}
