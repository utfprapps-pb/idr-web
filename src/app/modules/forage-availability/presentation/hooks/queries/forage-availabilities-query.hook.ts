import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetForageAvailabilitiesUseCase } from '../../../main/factories/use-cases/forage-availability-use-cases'
import {
  type ForageAvailabilityFilters,
  type ForageAvailabilitySort,
} from '../../types'

type Props = {
  propertyId: number
  filters: ForageAvailabilityFilters
  page: number
  sort?: ForageAvailabilitySort
}

export function useForageAvailabilitiesQuery({
  propertyId,
  filters,
  page,
  sort,
}: Props) {
  const getForageAvailabilitiesUseCase =
    makeRemoteGetForageAvailabilitiesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchForageAvailabilities,
  } = useQuery({
    queryKey: ['forage-availabilities', { page, sort, filters }],
    queryFn: () =>
      getForageAvailabilitiesUseCase.execute({
        propertyId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(
        error?.message ?? 'Erro ao buscar disponibilidades de forragem'
      )
  }, [error, isError])

  return {
    forageAvailabilities: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchForageAvailabilities,
  }
}
