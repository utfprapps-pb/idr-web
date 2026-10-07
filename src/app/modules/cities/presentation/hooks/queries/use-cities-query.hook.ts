import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetCitiesUseCase } from '../../../main/factories/use-cases'

type Props = {
  terms?: string
  page: number
}

export function useCitiesQuery({ page, terms = '' }: Props) {
  const getCitiesUseCase = makeRemoteGetCitiesUseCase()

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['cities', { page, terms }],
    queryFn: () =>
      getCitiesUseCase.execute({
        terms,
        page: page - 1,
        perPage: 10,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar cidades')
  }, [error, isError])

  return {
    cities: data ?? { resources: [], totalPages: 1 },
    isLoading,
    refetchCities: refetch,
  }
}
