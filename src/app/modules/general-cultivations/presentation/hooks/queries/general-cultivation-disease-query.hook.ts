import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetGeneralCultivationDiseaseUseCase } from '../../../main/factories/use-cases/general-cultivation-diseases-use-cases'

type Props = {
  id: number
}

export function useGeneralCultivationDiseaseQuery({ id }: Props) {
  const getGeneralCultivationDiseaseUseCase =
    makeRemoteGetGeneralCultivationDiseaseUseCase()

  const {
    data: generalCultivationDisease,
    isError,
    error,
    isLoading,
    refetch: refetchGeneralCultivationDisease,
  } = useQuery({
    queryKey: ['general-cultivation-disease', id],
    queryFn: () =>
      getGeneralCultivationDiseaseUseCase.execute({
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(
        error?.message ?? 'Erro ao buscar uma doença de cultivo geral'
      )
  }, [error, isError])

  return {
    generalCultivationDisease,
    isLoading,
    refetchGeneralCultivationDisease,
  }
}
