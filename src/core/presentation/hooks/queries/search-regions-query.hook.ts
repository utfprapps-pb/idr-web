import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteSearchRegionsUseCase } from '@/core/main/factories/use-cases/region-use-cases'

type Props = {
  terms?: string
}

export function useSearchRegionsQuery({ terms = '' }: Props = {}) {
  const searchRegionsUseCase = makeRemoteSearchRegionsUseCase()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['regions-search', { terms }],
    queryFn: () =>
      searchRegionsUseCase.execute({ terms, page: 0, perPage: 20 }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar regiões')
  }, [error, isError])

  return {
    regions:
      data?.items.map((item) => ({
        label: item.description,
        value: item.id,
      })) ?? [],
    isLoading,
  }
}
