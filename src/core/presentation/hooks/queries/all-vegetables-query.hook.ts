import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { VegetablesDataUseCasesFactory } from '@/core/main/factories/use-cases/vegetables-use-cases'

export function useAllVegetablesQuery(search: string) {
  const getAllVegetables =
    VegetablesDataUseCasesFactory.makeRemoteGetAllVegetablesUseCase()

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
