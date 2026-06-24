import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetPropertiesUseCase } from '../../../main/factories/use-cases'

import type { PropertyFilters } from '../../types'

type Props = {
  filters: PropertyFilters
  page: number
}

export function usePropertiesQuery({ page, filters }: Props) {
  const getPropertiesUseCase = makeRemoteGetPropertiesUseCase()

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['properties', { page, filters }],
    queryFn: () =>
      getPropertiesUseCase.execute({
        terms: filters.terms ?? '',
        page: page - 1,
        perPage: 10,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar propriedades')
  }, [error, isError])

  return {
    properties: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchProperties: refetch,
  }
}
