import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetCultivationPestsUseCase } from '../../../main/factories/use-cases/cultivation-pests-use-cases'

import type {
  CultivationPestFilters,
  CultivationPestSort,
} from '../../types/cultivation-pest-types'

type Props = {
  propertyId: number
  filters: CultivationPestFilters
  page: number
  sort?: CultivationPestSort
}

export function useCultivationPestsQuery({
  propertyId,
  filters,
  page,
  sort,
}: Props) {
  const getCultivationPestsUseCase = makeRemoteGetCultivationPestsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchCultivationPests,
  } = useQuery({
    queryKey: ['cultivation-pests', { page, sort, filters }],
    queryFn: () =>
      getCultivationPestsUseCase.execute({
        propertyId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar pragas do cultivo')
  }, [error, isError])

  return {
    cultivationPests: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchCultivationPests,
  }
}
