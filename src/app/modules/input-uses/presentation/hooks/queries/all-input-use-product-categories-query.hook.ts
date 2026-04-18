import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { toOption } from '@/core/utils/object/to-option'

import { makeRemoteGetInputUseProductCategoriesUseCase } from '../../../main/factories/use-cases/input-use-product-categories-use-cases'

import type { InputUseProductCategoryFilters } from '../../types/input-use-product-category-types'

type Props = {
  filters: InputUseProductCategoryFilters
}

export function useAllInputUseProductCategoriesQuery({ filters }: Props) {
  const getInputUseProductCategoriesUseCase =
    makeRemoteGetInputUseProductCategoriesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllInputUseProductCategories,
  } = useQuery({
    queryKey: ['all-input-use-product-categories', { filters }],
    queryFn: () =>
      getInputUseProductCategoriesUseCase.execute({
        filters,
        pagination: {
          page: 1,
          perPage: 30,
        },
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar categorias de produtos')
  }, [error, isError])

  return {
    allInputUseProductCategories:
      data?.resources.map((category) => toOption(category, 'name')) ?? [],
    isLoading,
    refetchAllInputUseProductCategories,
  }
}
