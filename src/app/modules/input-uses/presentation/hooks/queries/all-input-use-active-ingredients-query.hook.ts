import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { toOption } from '@/core/utils/object/to-option'

import { makeRemoteGetInputUseActiveIngredientsUseCase } from '../../../main/factories/use-cases/input-use-active-ingredients-use-cases'

import type { InputUseActiveIngredientFilters } from '../../types/input-use-active-ingredient-types'

type Props = {
  filters: InputUseActiveIngredientFilters
}

export function useAllInputUseActiveIngredientsQuery({ filters }: Props) {
  const getInputUseActiveIngredientsUseCase =
    makeRemoteGetInputUseActiveIngredientsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllInputUseActiveIngredients,
  } = useQuery({
    queryKey: ['all-input-use-active-ingredients', { filters }],
    queryFn: () =>
      getInputUseActiveIngredientsUseCase.execute({
        filters,
        pagination: {
          page: 1,
          perPage: 30,
        },
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar princípios ativos')
  }, [error, isError])

  return {
    allInputUseActiveIngredients:
      data?.resources.map((ingredient) => toOption(ingredient, 'name')) ?? [],
    isLoading,
    refetchAllInputUseActiveIngredients,
  }
}
