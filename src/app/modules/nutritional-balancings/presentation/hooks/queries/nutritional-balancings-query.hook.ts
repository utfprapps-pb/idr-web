import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetNutritionalBalancingsUseCase } from '../../../main/factories'

import type {
  NutritionalBalancingFilters,
  NutritionalBalancingSort,
} from '../../types/nutritional-balancing-types'

type Props = {
  propertyId: number
  filters: NutritionalBalancingFilters
  page: number
  sort?: NutritionalBalancingSort
}

export function useNutritionalBalancingsQuery({
  propertyId,
  filters,
  page,
  sort,
}: Props) {
  const getNutritionalBalancingsUseCase =
    makeRemoteGetNutritionalBalancingsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchNutritionalBalancings,
  } = useQuery({
    queryKey: ['nutritional-balancings', propertyId, { page, sort, filters }],
    enabled: !!propertyId,
    queryFn: () =>
      getNutritionalBalancingsUseCase.execute({
        propertyId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(
        error?.message ?? 'Erro ao buscar balanceamentos nutricionais'
      )
  }, [error, isError])

  return {
    nutritionalBalancings: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchNutritionalBalancings,
  }
}
