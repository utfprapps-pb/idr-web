import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetProductCategoryUseCase } from '../../../main/factories/use-cases/product-categories-use-cases'

type Props = {
  id: number
}

export function useProductCategoryQuery({ id }: Props) {
  const getProductCategoryUseCase = makeRemoteGetProductCategoryUseCase()

  const {
    data: productCategory,
    isError,
    error,
    isLoading,
    refetch: refetchProductCategory,
  } = useQuery({
    queryKey: ['product-category', id],
    queryFn: () => getProductCategoryUseCase.execute({ id }),
    enabled: !!id,
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar categoria de produto')
  }, [error, isError])

  return {
    productCategory,
    isLoading,
    refetchProductCategory,
  }
}
