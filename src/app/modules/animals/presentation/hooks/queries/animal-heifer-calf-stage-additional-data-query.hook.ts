import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalHeiferCalfStageAdditionalDataUseCase } from '../../../main/factories/use-cases/animal-heifer-calf-stages-use-cases/remote-get-animal-heifer-calf-stage-additional-data-use-case-factory'

type Props = {
  propertyId: string
  animalId: string
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
      toast.error('Erro ao buscar dados adicionais da fase bezerra novilha')
  }, [isError])

  return {
    animalHeiferCalfStageAdditionalData,
    isLoading,
    refetchAnimalHeiferCalfStageAdditionalData,
  }
}
