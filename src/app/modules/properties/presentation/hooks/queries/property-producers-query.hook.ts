import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteSearchProducersUseCase } from '@/app/modules/producers/main/factories/use-cases'

type Props = {
  terms?: string
}

export function usePropertyProducersQuery({ terms = '' }: Props = {}) {
  const searchProducersUseCase = makeRemoteSearchProducersUseCase()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['producers-search', { terms }],
    queryFn: () =>
      searchProducersUseCase.execute({ terms, page: 0, perPage: 30 }),
    enabled: true,
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar produtores')
  }, [error, isError])

  return {
    producers:
      data?.items.map((item) => ({ label: item.name, value: item.id })) ?? [],
    isLoading,
  }
}
