import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetGeneralCultivationUseCase } from '../../../main/factories/use-cases/general-cultivations-use-cases'

type Props = {
  id: number
}

export function useGeneralCultivationQuery({ id }: Props) {
  const getGeneralCultivationUseCase = makeRemoteGetGeneralCultivationUseCase()

  const {
    data: generalCultivation,
    isError,
    error,
    isLoading,
    refetch: refetchGeneralCultivation,
  } = useQuery({
    queryKey: ['general-cultivation', id],
    queryFn: () =>
      getGeneralCultivationUseCase.execute({
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar um cultivo geral')
  }, [error, isError])

  return {
    generalCultivation,
    isLoading,
    refetchGeneralCultivation,
  }
}
