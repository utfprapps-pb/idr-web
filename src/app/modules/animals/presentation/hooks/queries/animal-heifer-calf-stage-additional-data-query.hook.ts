import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalHeiferCalfStageAdditionalDataUseCase } from '../../../main/factories/use-cases/animal-heifer-calf-stages-use-cases/remote-get-animal-heifer-calf-stage-additional-data-use-case-factory'

type Props = {
  propertyId: number
  animalId: number
}

export function useAnimalHeiferCalfStageAdditionalDataQuery({
  propertyId,
  animalId,
}: Props) {
  const getAnimalHeiferCalfStageAdditionalDataUseCase =
    makeRemoteGetAnimalHeiferCalfStageAdditionalDataUseCase()

  const {
    data: animalHeiferCalfStageAdditionalData,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalHeiferCalfStageAdditionalData,
  } = useQuery({
    queryKey: [
      'animal-heifer-calf-stage-additional-data',
      propertyId,
      animalId,
    ],
    queryFn: () =>
      getAnimalHeiferCalfStageAdditionalDataUseCase.execute({
        propertyId,
        animalId,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(
        error?.message ??
          'Erro ao buscar dados adicionais da fase bezerra novilha'
      )
  }, [error, isError])

  return {
    animalHeiferCalfStageAdditionalData,
    isLoading,
    refetchAnimalHeiferCalfStageAdditionalData,
  }
}
