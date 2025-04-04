import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalHeiferCalfStageUseCase } from '../../../main/factories/use-cases/animal-heifer-calf-stages-use-cases'

type Props = {
  id: string
  propertyId: string
  animalId: string
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
    if (isError) toast.error('Erro ao buscar fase bezerra novilha')
  }, [isError])

  return {
    animalHeiferCalfStage,
    isLoading,
    refetchAnimalHeiferCalfStage,
  }
}
