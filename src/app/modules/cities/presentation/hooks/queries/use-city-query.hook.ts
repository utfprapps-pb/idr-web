import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetCityUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: string
}

export function useCityQuery({ id }: Props) {
  const getCityUseCase = makeRemoteGetCityUseCase()

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['city', id],
    queryFn: () => getCityUseCase.execute(id),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar cidade')
  }, [error, isError])

  return {
    city: data,
    isLoading,
    refetchCity: refetch,
  }
}
