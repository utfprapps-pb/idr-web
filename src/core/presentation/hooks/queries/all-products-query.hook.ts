import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllProductsUseCase } from '@/core/main/factories/use-cases/products-use-cases'
import { toOption } from '@/core/utils/object/to-option'

import type { ProductModel } from '@/core/domain/models/products-model'
import type { Filters } from '@/core/domain/types'

type Props = {
  filters: Filters<ProductModel>
}

export function useAllProductsQuery({ filters }: Props) {
  const getAllProducts = makeRemoteGetAllProductsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllProducts,
  } = useQuery({
    queryKey: ['all-products', { filters }],
    queryFn: () =>
      getAllProducts.execute({
        filters,
        pagination: {
          page: 1,
          perPage: 30,
        },
      }),
    enabled: !!filters,
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar produtos')
  }, [error, isError])

  return {
    allProducts:
      data?.resources.map((resource) =>
        toOption(resource, 'name', {
          activeIngredient: resource.activeIngredient,
        })
      ) ?? [],
    isLoading,
    refetchAllProducts,
  }
}
