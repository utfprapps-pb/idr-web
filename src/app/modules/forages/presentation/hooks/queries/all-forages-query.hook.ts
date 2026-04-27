import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { toOption } from '@/core/utils/object/to-option'

import { makeRemoteGetForagesUseCase } from '../../../main/factories/use-cases'

import type { ForageFilters } from '../../types'

type Props = {
  propertyId: number
  filters: ForageFilters
}

export function useAllForagesQuery({ propertyId, filters }: Props) {
  const getForagesUseCase = makeRemoteGetForagesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllForages,
  } = useQuery({
    queryKey: ['all-forages', propertyId, { filters }],
    enabled: !!propertyId,
    queryFn: () =>
      getForagesUseCase.execute({
        propertyId,
        filters,
        pagination: { page: 1, perPage: 30 },
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar forrageiras')
  }, [error, isError])

  return {
    allForages:
      data?.resources.map((forage) => toOption(forage, 'cultivation')) ?? [],
    isLoading,
    refetchAllForages,
  }
}
