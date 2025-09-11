import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetForagesUseCase } from '../../../main/factories/use-cases'

import type { ForageFilters, ForageSort } from '../../types'

type Props = {
  propertyId: number
  filters: ForageFilters
  page: number
  sort?: ForageSort
}

export function useForagesQuery({ propertyId, filters, page, sort }: Props) {
  const getForagesUseCase = makeRemoteGetForagesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchForages,
  } = useQuery({
    queryKey: ['forages', { page, sort, filters }],
    queryFn: () =>
      getForagesUseCase.execute({
        propertyId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar forrageiras')
  }, [error, isError])

  return {
    forages: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchForages,
  }
}
