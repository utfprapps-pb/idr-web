import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetImprovementsUseCase } from '../../../main/factories/use-cases'

import type { ImprovementFilters, ImprovementSort } from '../../types'

type Props = {
  propertyId: string
  filters: ImprovementFilters
  page: number
  sort?: ImprovementSort
}

export function useImprovementsQuery({
  propertyId,
  filters,
  page,
  sort,
}: Props) {
  const getImprovementsUseCase = makeRemoteGetImprovementsUseCase()

  const {
    data,
    isError,
    isLoading,
    refetch: refetchImprovements,
  } = useQuery({
    queryKey: ['improvements', { page, sort, filters }],
    queryFn: () =>
      getImprovementsUseCase.execute({
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
