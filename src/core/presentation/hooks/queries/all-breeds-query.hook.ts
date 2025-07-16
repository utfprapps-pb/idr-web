import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllBreedsUseCase } from '@/core/main/factories/use-cases/breeds-use-cases'

export function useAllBreedsQuery(search: string) {
  const getAllBreedsUseCase = makeRemoteGetAllBreedsUseCase()
  console.log("ALLBREEDSQUERY");

  const {
    data: allBreeds = [],
    isError,
    isLoading,
    refetch: refetchAllBreeds,
  } = useQuery({
    queryKey: ['allBreeds', search],
    queryFn: () => getAllBreedsUseCase.execute(search),
    // Carregar ou não as raças antes do usuário inserir algo na busca?
    //enabled: !!search,
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
