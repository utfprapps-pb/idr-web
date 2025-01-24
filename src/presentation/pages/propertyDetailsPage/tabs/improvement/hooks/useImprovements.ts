import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ImprovementDataFactory } from '@/main/factories/useCases/improvement'

import type { ImprovementFilters, ImprovementSort } from '../types'

type Props = {
  propertyId: string
  filters: ImprovementFilters
  page: number
  sort?: ImprovementSort
}

export const useImprovements = ({ propertyId, filters, page, sort }: Props) => {
  const getImprovements = ImprovementDataFactory.makeRemoteGetImprovements()

  const {
    data,
    isError,
    isLoading,
    refetch: refetchImprovements,
  } = useQuery({
    queryKey: ['improvements', { page, sort, filters }],
    queryFn: () =>
      getImprovements.execute({
        propertyId,
        queryParams: {
          pagination: { page },
          sort,
          filters,
        },
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar benfeitorias')
  }, [isError])

  return {
    improvements: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchImprovements,
  }
}
