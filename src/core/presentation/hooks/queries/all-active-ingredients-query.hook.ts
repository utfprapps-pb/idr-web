import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllActiveIngredientsUseCase } from '@/core/main/factories/use-cases/active-ingredients-use-cases'
import { toOption } from '@/core/utils/object/to-option'

import type { ActiveIngredientModel } from '@/core/domain/models/active-ingredients-model'
import type { Filters } from '@/core/domain/types'

type Props = {
  filters: Filters<ActiveIngredientModel>
}

export function useAllActiveIngredientsQuery({ filters }: Props) {
  const getAllActiveIngredients = makeRemoteGetAllActiveIngredientsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllActiveIngredients,
  } = useQuery({
    queryKey: ['all-active-ingredients', { filters }],
    queryFn: () =>
      getAllActiveIngredients.execute({
        filters,
        pagination: {
          page: 1,
          perPage: 30,
        },
      }),
    enabled: !!filters,
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar princípios ativos')
  }, [error, isError])

  return {
    allActiveIngredients:
      data?.resources.map((resource) => toOption(resource, 'name')) ?? [],
    isLoading,
    refetchAllActiveIngredients,
  }
}
