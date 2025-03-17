import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllBreedsUseCase } from '@/core/main/factories/use-cases/breeds-use-cases'

export function useAllBreedsQuery(search: string) {
  const getAllBreeds = makeRemoteGetAllBreedsUseCase()

  const {
    data: allBreeds = [],
    isError,
    isLoading,
    refetch: refetchAllBreeds,
  } = useQuery({
    queryKey: ['allBreeds', search],
    queryFn: () => getAllBreeds.execute(search),
    enabled: !!search,
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
