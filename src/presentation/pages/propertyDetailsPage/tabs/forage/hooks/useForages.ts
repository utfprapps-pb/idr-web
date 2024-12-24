import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ForageDataFactory } from '@/main/factories/useCases/forage'

import type { ForageFilters, ForageSort } from '../types'

type Props = {
  propertyId: string
  filters: ForageFilters
  page: number
  sort?: ForageSort
}

export const useForage = ({ propertyId, filters, page, sort }: Props) => {
  const getForages = ForageDataFactory.makeRemoteGetAll()

  const {
    data,
    isError,
    isLoading,
    refetch: refetchForages,
  } = useQuery({
    queryKey: ['forages', { page, sort, filters }],
    queryFn: () =>
      getForages.execute({
        propertyId,
        queryParams: {
          pagination: { page },
          sort,
          filters,
        },
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar forrageiras')
  }, [isError])

  return {
    forages: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchForages,
  }
}
