import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllVegetablesUseCase } from '@/core/main/factories/use-cases/vegetables-use-cases'
import { toOption } from '@/core/utils/object/to-option'

import type { VegetableModel } from '@/core/domain/models/vegetables-model'
import type { Filters } from '@/core/domain/types'

type Props = {
  filters: Filters<VegetableModel>
}

export function useAllVegetablesQuery({ filters }: Props) {
  const getAllVegetables = makeRemoteGetAllVegetablesUseCase()

  const {
    data,
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
    allVegetables:
      data?.resources.map((resource) => toOption(resource, 'name')) ?? [],
    isLoading,
    refetchAllVegetables,
  }
}
