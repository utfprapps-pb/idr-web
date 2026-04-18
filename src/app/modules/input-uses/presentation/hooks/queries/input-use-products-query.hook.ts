import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetInputUseProductsUseCase } from '../../../main/factories/use-cases/input-use-products-use-cases'

import type {
  InputUseProductFilters,
  InputUseProductSort,
} from '../../types/input-use-product-types'

type Props = {
  filters?: InputUseProductFilters
  page: number
  sort?: InputUseProductSort
}

export function useInputUseProductsQuery({ filters, page, sort }: Props) {
  const getInputUseProductsUseCase = makeRemoteGetInputUseProductsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchInputUseProducts,
  } = useQuery({
    queryKey: ['input-use-products', { page, sort, filters }],
    queryFn: () =>
      getInputUseProductsUseCase.execute({
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar produtos')
  }, [error, isError])

  return {
    inputUseProducts: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchInputUseProducts,
  }
}
