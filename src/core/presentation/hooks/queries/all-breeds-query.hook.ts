import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllBreedsUseCase } from '@/core/main/factories/use-cases/breeds-use-cases'
import { toOption } from '@/core/utils/object/to-option'

export function useAllBreedsQuery(search: string) {
  const getAllBreedsUseCase = makeRemoteGetAllBreedsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllBreeds,
  } = useQuery({
    queryKey: ['allBreeds', search],
    queryFn: () => getAllBreedsUseCase.execute(search),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar raças')
  }, [error, isError])

  return {
    allBreeds:
      data?.resources.map((resource) => toOption(resource, 'name')) ?? [],
    isLoading,
    refetchAllBreeds,
  }
}
