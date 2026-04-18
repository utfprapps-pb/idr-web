import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { toOption } from '@/core/utils/object/to-option'

import { makeRemoteGetInputUseProductsUseCase } from '../../../main/factories/use-cases/input-use-products-use-cases'

import type { InputUseProductFilters } from '../../types/input-use-product-types'

type Props = {
  filters: InputUseProductFilters
}

export function useAllInputUseProductsQuery({ filters }: Props) {
  const getInputUseProductsUseCase = makeRemoteGetInputUseProductsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllInputUseProducts,
  } = useQuery({
    queryKey: ['all-input-use-products', { filters }],
    queryFn: () =>
      getInputUseProductsUseCase.execute({
        filters,
        pagination: {
          page: 1,
          perPage: 30,
        },
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar produtos')
  }, [error, isError])

  return {
    allInputUseProducts:
      data?.resources.map((product) =>
        toOption(product, 'name', {
          activeIngredient: product.activeIngredient,
        })
      ) ?? [],
    isLoading,
    refetchAllInputUseProducts,
  }
}
