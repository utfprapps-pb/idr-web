import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetPropertiesUseCase } from '../../../main/factories/use-cases'

import type { PropertyFilters, PropertySort } from '../../types'

type Props = {
  filters: PropertyFilters
  page: number
  sort?: PropertySort
}

export function usePropertiesQuery({ page, filters, sort }: Props) {
  const getPropertiesUseCase = makeRemoteGetPropertiesUseCase()

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['properties', { page, sort, filters }],
    queryFn: () =>
      getPropertiesUseCase.execute({
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar propriedades')
  }, [isError])

  return {
    properties: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchProperties: refetch,
  }
}
