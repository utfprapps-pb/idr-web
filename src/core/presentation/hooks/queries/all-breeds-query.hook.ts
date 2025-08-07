import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllBreedsUseCase } from '@/core/main/factories/use-cases/breeds-use-cases'
import { toOption } from '@/core/utils/object/to-option'

import type { BreedModel } from '@/core/domain/models/breeds-model'
import type { Filters } from '@/core/domain/types'

type Props = {
  filters: Filters<BreedModel>
}

export function useAllBreedsQuery({ filters }: Props) {
  const getAllBreeds = makeRemoteGetAllBreedsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllBreeds,
  } = useQuery({
    queryKey: ['all-breeds', { filters }],
    queryFn: () =>
      getAllBreeds.execute({
        filters,
        pagination: {
          page: 0,
          perPage: 30,
        },
      }),
    enabled: !!filters,
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar raças')
  }, [error, isError])

  return {
    allBreeds:
      data?.resources.map((resource) => toOption(resource, 'name')) ?? [],
    isLoading,
    refetchAllBreeds,
  }
}
