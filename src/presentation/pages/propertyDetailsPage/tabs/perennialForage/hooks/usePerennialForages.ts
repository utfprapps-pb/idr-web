import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { PerennialForageDataFactory } from '@/main/factories/useCases/perennialForage'

import type { PerennialForageFilters, PerennialForageSort } from '../types'

type Props = {
  filters: PerennialForageFilters
  page: number
  sort?: PerennialForageSort
}

export const usePerennialForages = ({ filters, page, sort }: Props) => {
  const getPerennialForages = PerennialForageDataFactory.makeRemoteGetAll()

  const {
    data,
    isError,
    isLoading,
    refetch: refetchPerennialForages,
  } = useQuery({
    queryKey: ['perennialForages', { page, sort, filters }],
    queryFn: () =>
      getPerennialForages.execute({
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar forrageiras perenes')
  }, [isError])

  return {
    perennialForages: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchPerennialForages,
  }
}
