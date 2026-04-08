import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetInputUseProductCategoriesUseCase } from '../../../main/factories/use-cases/input-use-product-categories-use-cases'

import type {
  InputUseProductCategoryFilters,
  InputUseProductCategorySort,
} from '../../types/input-use-product-category-types'

type Props = {
  filters: InputUseProductCategoryFilters
  page: number
  sort?: InputUseProductCategorySort
}

export function useInputUseProductCategoriesQuery({
  filters,
  page,
  sort,
}: Props) {
  const getInputUseProductCategoriesUseCase =
    makeRemoteGetInputUseProductCategoriesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchInputUseProductCategories,
  } = useQuery({
    queryKey: ['input-use-product-categories', { page, sort, filters }],
    queryFn: () =>
      getInputUseProductCategoriesUseCase.execute({
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar categorias de produtos')
  }, [error, isError])

  return {
    inputUseProductCategories: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchInputUseProductCategories,
  }
}
