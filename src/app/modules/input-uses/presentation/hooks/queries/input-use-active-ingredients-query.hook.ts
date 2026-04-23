import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetInputUseActiveIngredientsUseCase } from '../../../main/factories/use-cases/input-use-active-ingredients-use-cases'

import type {
  InputUseActiveIngredientFilters,
  InputUseActiveIngredientSort,
} from '../../types/input-use-active-ingredient-types'

type Props = {
  filters: InputUseActiveIngredientFilters
  page: number
  sort?: InputUseActiveIngredientSort
}

export function useInputUseActiveIngredientsQuery({
  filters,
  page,
  sort,
}: Props) {
  const getInputUseActiveIngredientsUseCase =
    makeRemoteGetInputUseActiveIngredientsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchInputUseActiveIngredients,
  } = useQuery({
    queryKey: ['input-use-active-ingredients', { page, sort, filters }],
    queryFn: () =>
      getInputUseActiveIngredientsUseCase.execute({
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar princípios ativos')
  }, [error, isError])

  return {
    inputUseActiveIngredients: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchInputUseActiveIngredients,
  }
}
