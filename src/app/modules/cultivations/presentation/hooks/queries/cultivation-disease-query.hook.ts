import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetCultivationDiseaseUseCase } from '../../../main/factories/use-cases/cultivation-diseases-use-cases'

type Props = {
  id: number
  propertyId: number
}

export function useCultivationDiseaseQuery({ id, propertyId }: Props) {
  const getCultivationDiseaseUseCase = makeRemoteGetCultivationDiseaseUseCase()

  const {
    data: cultivationDisease,
    isError,
    error,
    isLoading,
    refetch: refetchCultivationDisease,
  } = useQuery({
    queryKey: ['cultivation-disease', id],
    queryFn: () =>
      getCultivationDiseaseUseCase.execute({
        propertyId,
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar doença do cultivo')
  }, [error, isError])

  return {
    cultivationDisease,
    isLoading,
    refetchCultivationDisease,
  }
}
