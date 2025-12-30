import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetLastVisitNutritionalBalancingsUseCase } from '../../../main/factories'

type Props = {
  propertyId: number
  enabled?: boolean
}

export function useLastVisitNutritionalBalancingsQuery({
  propertyId,
  enabled = true,
}: Props) {
  const getLastVisitNutritionalBalancingsUseCase =
    makeRemoteGetLastVisitNutritionalBalancingsUseCase()

  const {
    data: lastVisitData,
    isError,
    error,
    isLoading,
    refetch: refetchLastVisitNutritionalBalancings,
  } = useQuery({
    queryKey: ['nutritional-balancings-last-visit', propertyId],
    queryFn: () =>
      getLastVisitNutritionalBalancingsUseCase.execute({
        propertyId,
      }),
    enabled,
  })

  useEffect(() => {
    if (isError)
      toast.error(
        error?.message ?? 'Erro ao buscar balanceamentos da última visita'
      )
  }, [error, isError])

  return {
    lastVisitData,
    isLoading,
    refetchLastVisitNutritionalBalancings,
  }
}
