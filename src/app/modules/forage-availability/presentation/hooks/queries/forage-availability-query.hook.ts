import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetForageAvailabilityUseCase } from '../../../main/factories/use-cases/forage-availability-use-cases'

type Props = {
  propertyId: number
  id: number
}

export function useForageAvailabilityQuery({ propertyId, id }: Props) {
  const getForageAvailabilityUseCase = makeRemoteGetForageAvailabilityUseCase()

  const {
    data: forageAvailability,
    isError,
    error,
    isLoading,
    refetch: refetchForageAvailability,
  } = useQuery({
    queryKey: ['forage-availability', propertyId, id],
    enabled: !!propertyId && !!id,
    queryFn: () => getForageAvailabilityUseCase.execute({ propertyId, id }),
  })

  useEffect(() => {
    if (isError)
      toast.error(
        error?.message ?? 'Erro ao buscar disponibilidade de forragem'
      )
  }, [error, isError])

  return {
    forageAvailability,
    isLoading,
    refetchForageAvailability,
  }
}
