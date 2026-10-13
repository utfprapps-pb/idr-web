import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetRegionsUseCase } from '../../../main/factories/use-cases'

type Props = {
  terms?: string
  page: number
}

export function useRegionsQuery({ page, terms = '' }: Props) {
  const getRegionsUseCase = makeRemoteGetRegionsUseCase()

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['regions', { page, terms }],
    queryFn: () =>
      getRegionsUseCase.execute({
        terms,
        page: page - 1,
        perPage: 10,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar regiões')
  }, [error, isError])

  return {
    regions: data ?? { resources: [], totalPages: 1 },
    isLoading,
    refetchRegions: refetch,
  }
}
