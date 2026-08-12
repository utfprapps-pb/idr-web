import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteSearchCitiesUseCase } from '@/app/modules/cities/main/factories/use-cases'

type Props = {
  terms?: string
}

export function useSearchCitiesQuery({ terms = '' }: Props = {}) {
  const searchCitiesUseCase = makeRemoteSearchCitiesUseCase()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['cities-search', { terms }],
    queryFn: () => searchCitiesUseCase.execute({ terms, page: 0, perPage: 10 }),
    enabled: true,
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar municípios')
  }, [error, isError])

  return {
    cities:
      data?.items.map((item) => ({ label: item.name, value: item.id })) ?? [],
    isLoading,
  }
}
