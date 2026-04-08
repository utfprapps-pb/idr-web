import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetProductCategoriesUseCase } from '../../../main/factories/use-cases/product-categories-use-cases'

import type {
  ProductCategoryFilters,
  ProductCategorySort,
} from '../../types/product-category-types'

type Props = {
  filters: ProductCategoryFilters
  page: number
  sort?: ProductCategorySort
}

export function useProductCategoriesQuery({ filters, page, sort }: Props) {
  const getProductCategoriesUseCase = makeRemoteGetProductCategoriesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchProductCategories,
  } = useQuery({
    queryKey: ['product-categories', { page, sort, filters }],
    queryFn: () =>
      getProductCategoriesUseCase.execute({
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
    productCategories: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchProductCategories,
  }
}
