import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllBreedsUseCase } from '@/core/main/factories/use-cases/breeds-use-cases'

export function useAllBreedsQuery(search: string) {
  const getAllBreedsUseCase = makeRemoteGetAllBreedsUseCase()

  const {
    data: allBreeds = [],
    isError,
    isLoading,
    refetch: refetchAllBreeds,
  } = useQuery({
    queryKey: ['allBreeds', search],
    queryFn: () => getAllBreedsUseCase.execute(search),
    // enabled: !!search,
    // executar a query assim que o usuário abrir o dropdown, não só quando pesquisa.
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar raças')
  }, [isError])

  return {
    allBreeds,
    isLoading,
    refetchAllBreeds,
  }
}
