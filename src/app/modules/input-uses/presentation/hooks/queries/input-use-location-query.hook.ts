import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetInputUseLocationUseCase } from '../../../main/factories/use-cases/input-use-locations-use-cases'

type Props = {
  id: number
}

export function useInputUseLocationQuery({ id }: Props) {
  const getInputUseLocationUseCase = makeRemoteGetInputUseLocationUseCase()

  const {
    data: inputUseLocation,
    isError,
    error,
    isLoading,
    refetch: refetchInputUseLocation,
  } = useQuery({
    queryKey: ['input-use-location', id],
    queryFn: () => getInputUseLocationUseCase.execute({ id }),
    enabled: !!id,
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar local de utilização')
  }, [error, isError])

  return {
    inputUseLocation,
    isLoading,
    refetchInputUseLocation,
  }
}
