import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteSearchUsersUseCase } from '@/core/main/factories/use-cases/users-use-cases'

type Props = {
  terms?: string
}

export function usePropertyUsersQuery({ terms = '' }: Props = {}) {
  const searchUsersUseCase = makeRemoteSearchUsersUseCase()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['users-search', { terms }],
    queryFn: () => searchUsersUseCase.execute({ terms, page: 0, perPage: 30 }),
    enabled: true,
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar usuários')
  }, [error, isError])

  return {
    users:
      data?.items.map((item) => ({ label: item.name, value: item.id })) ?? [],
    isLoading,
  }
}
