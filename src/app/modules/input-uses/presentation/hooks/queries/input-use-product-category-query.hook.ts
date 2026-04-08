import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetInputUseProductCategoryUseCase } from '../../../main/factories/use-cases/input-use-product-categories-use-cases'

type Props = {
  id: number
}

export function useInputUseProductCategoryQuery({ id }: Props) {
  const getInputUseProductCategoryUseCase =
    makeRemoteGetInputUseProductCategoryUseCase()

  const {
    data: inputUseProductCategory,
    isError,
    error,
    isLoading,
    refetch: refetchInputUseProductCategory,
  } = useQuery({
    queryKey: ['input-use-product-category', id],
    queryFn: () => getInputUseProductCategoryUseCase.execute({ id }),
    enabled: !!id,
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar categoria de produto')
  }, [error, isError])

  return {
    inputUseProductCategory,
    isLoading,
    refetchInputUseProductCategory,
  }
}
