import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetInputUseActiveIngredientUseCase } from '../../../main/factories/use-cases/input-use-active-ingredients-use-cases'

type Props = {
  id: number
}

export function useInputUseActiveIngredientQuery({ id }: Props) {
  const getInputUseActiveIngredientUseCase =
    makeRemoteGetInputUseActiveIngredientUseCase()

  const {
    data: inputUseActiveIngredient,
    isError,
    error,
    isLoading,
    refetch: refetchInputUseActiveIngredient,
  } = useQuery({
    queryKey: ['input-use-active-ingredient', id],
    queryFn: () => getInputUseActiveIngredientUseCase.execute({ id }),
    enabled: !!id,
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar princípio ativo')
  }, [error, isError])

  return {
    inputUseActiveIngredient,
    isLoading,
    refetchInputUseActiveIngredient,
  }
}
