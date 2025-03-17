import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetCepUseCase } from '@/core/main/factories/use-cases/cep-use-cases'
import { onlyNumbersMask } from '@/core/masker'

import { useDebounce } from '../debounce.hook'

export function useCepQuery(cep: string) {
  const getCepUseCase = makeRemoteGetCepUseCase()

  const debouncedCep = useDebounce({
    value: cep,
    delayInMs: 1000,
  })

  const {
    data,
    isError,
    isLoading,
    refetch: refetchCep,
  } = useQuery({
    queryKey: ['cep', debouncedCep],
    queryFn: () => getCepUseCase.execute(debouncedCep),
    enabled: !!cep && onlyNumbersMask(cep).length === 8,
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar dados do CEP')
  }, [isError])

  if (data) {
    const { cep, city, neighborhood, state, street } = data

    return {
      address: {
        cep,
        city,
        neighborhood,
        state,
        street,
      },
      isLoading,
      refetchCep,
    }
  }

  return {
    address: null,
    isLoading,
    refetchCep,
  }
}
