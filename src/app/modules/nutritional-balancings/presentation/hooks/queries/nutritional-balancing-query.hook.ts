import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetNutritionalBalancingUseCase } from '../../../main/factories'

type Props = {
  id: number
  propertyId: number
}

export function useNutritionalBalancingQuery({ id, propertyId }: Props) {
  const getNutritionalBalancingUseCase =
    makeRemoteGetNutritionalBalancingUseCase()

  const {
    data: nutritionalBalancing,
    isError,
    error,
    isLoading,
    refetch: refetchNutritionalBalancing,
  } = useQuery({
    queryKey: ['nutritional-balancing', propertyId, id],
    enabled: !!propertyId && !!id,
    queryFn: () =>
      getNutritionalBalancingUseCase.execute({
        propertyId,
        nutritionalBalancingId: id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar balanceamento nutricional')
  }, [error, isError])

  return {
    nutritionalBalancing,
    isLoading,
    refetchNutritionalBalancing,
  }
}
