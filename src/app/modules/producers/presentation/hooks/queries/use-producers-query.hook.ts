import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetProducersUseCase } from '../../../main/factories/use-cases'

import type { ProducerFilters } from '../../types'

type Props = {
  filters: ProducerFilters
  page: number
}

export function useProducersQuery({ page, filters }: Props) {
  const getProducersUseCase = makeRemoteGetProducersUseCase()

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['producers', { page, filters }],
    queryFn: () =>
      getProducersUseCase.execute({
        terms: filters.terms ?? '',
        page: page - 1,
        perPage: 10,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar produtores')
  }, [error, isError])

  return {
    producers: data ?? { resources: [], totalPages: 1 },
    isLoading,
    refetchProducers: refetch,
  }
}
