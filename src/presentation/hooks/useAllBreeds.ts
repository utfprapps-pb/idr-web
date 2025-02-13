import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { BreedDataFactory } from '@/main/factories/useCases/breed'

export const useAllBreeds = (search: string) => {
  const getAllBreeds = BreedDataFactory.makeRemoteGetAllBreeds()

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
