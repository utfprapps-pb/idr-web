import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetInputUseProductUseCase } from '../../../main/factories/use-cases/input-use-products-use-cases'

type Props = {
  id: number
}

export function useInputUseProductQuery({ id }: Props) {
  const getInputUseProductUseCase = makeRemoteGetInputUseProductUseCase()

  const {
    data: inputUseProduct,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['input-use-product', id],
    queryFn: () => getInputUseProductUseCase.execute({ id }),
    enabled: !!id,
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar detalhes do produto')
  }, [error, isError])

  return {
    inputUseProduct,
    isLoading,
  }
}
