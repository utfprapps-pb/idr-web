import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetGeneralCultivationPestUseCase } from '../../../main/factories/use-cases/general-cultivation-pests-use-cases'

type Props = {
  id: number
}

export function useGeneralCultivationPestQuery({ id }: Props) {
  const getGeneralCultivationPestUseCase =
    makeRemoteGetGeneralCultivationPestUseCase()

  const {
    data: generalCultivationPest,
    isError,
    error,
    isLoading,
    refetch: refetchGeneralCultivationPest,
  } = useQuery({
    queryKey: ['general-cultivation-pest', id],
    queryFn: () =>
      getGeneralCultivationPestUseCase.execute({
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar uma praga de cultivo geral')
  }, [error, isError])

  return {
    generalCultivationPest,
    isLoading,
    refetchGeneralCultivationPest,
  }
}
