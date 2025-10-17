import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllProductCategoriesUseCase } from '@/core/main/factories/use-cases/product-categories-use-cases'
import { toOption } from '@/core/utils/object/to-option'

import type { ProductCategoryModel } from '@/core/domain/models/product-categories-model'
import type { Filters } from '@/core/domain/types'

type Props = {
  filters: Filters<ProductCategoryModel>
}

export function useAllProductCategoriesQuery({ filters }: Props) {
  const getAllProductCategories = makeRemoteGetAllProductCategoriesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllProductCategories,
  } = useQuery({
    queryKey: ['all-product-categories', { filters }],
    queryFn: () =>
      getAllProductCategories.execute({
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
      toast.error(error?.message ?? 'Erro ao buscar categorias de produtos')
  }, [error, isError])

  return {
    allProductCategories:
      data?.resources.map((resource) => toOption(resource, 'description')) ??
      [],
    isLoading,
    refetchAllProductCategories,
  }
}
