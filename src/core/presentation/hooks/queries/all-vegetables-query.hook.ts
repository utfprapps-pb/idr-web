import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllVegetablesUseCase } from '@/core/main/factories/use-cases/vegetables-use-cases'

import type { Filters, Option } from '@/core/domain/types'

type Props = {
  filters: Filters<Option>
}

export function useAllVegetablesQuery({ filters }: Props) {
  const getAllVegetables = makeRemoteGetAllVegetablesUseCase()

  const {
    data: allVegetables = [],
    isError,
    error,
    isLoading,
    refetch: refetchAllVegetables,
  } = useQuery({
    queryKey: ['all-vegetables', { filters }],
    queryFn: () =>
      getAllVegetables.execute({
        filters,
        pagination: {
          page: 0,
          perPage: 30,
        },
      }),
    enabled: !!filters,
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar vegetais')
  }, [error, isError])

  return {
    allVegetables,
    isLoading,
    refetchAllVegetables,
  }
}
