import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { VegetableDataFactory } from '@/main/factories/useCases/vegetable'

export const useAllVegetables = (search: string) => {
  const getAllVegetables = VegetableDataFactory.makeRemoteGetAllVegetables()

  const {
    data: allVegetables = [],
    isError,
    isLoading,
    refetch: refetchAllVegetables,
  } = useQuery({
    queryKey: ['allVegetables', search],
    queryFn: () => getAllVegetables.execute(search),
    enabled: !!search,
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar vegetais')
  }, [isError])

  return {
    allVegetables,
    isLoading,
    refetchAllVegetables,
  }
}
