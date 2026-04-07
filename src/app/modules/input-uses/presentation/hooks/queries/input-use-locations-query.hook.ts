import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetInputUseLocationsUseCase } from '../../../main/factories/use-cases/input-use-locations-use-cases'

import type {
  InputUseLocationFilters,
  InputUseLocationSort,
} from '../../types/input-use-location-types'

type Props = {
  filters: InputUseLocationFilters
  page: number
  sort?: InputUseLocationSort
}

export function useInputUseLocationsQuery({ filters, page, sort }: Props) {
  const getInputUseLocationsUseCase = makeRemoteGetInputUseLocationsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchInputUseLocations,
  } = useQuery({
    queryKey: ['input-use-locations', { page, sort, filters }],
    queryFn: () =>
      getInputUseLocationsUseCase.execute({
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar locais de uso de insumo')
  }, [error, isError])

  return {
    inputUseLocations: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchInputUseLocations,
  }
}
