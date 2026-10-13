import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetUsersUseCase } from '../../../main/factories/use-cases'

type Props = {
  page: number
  terms?: string
  active?: boolean
}

export function useUsersQuery({ page, terms, active }: Props) {
  const getUsersUseCase = makeRemoteGetUsersUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['admin', 'users', { page, terms, active }],
    queryFn: () => getUsersUseCase.execute({ page, terms, active }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar usuários')
  }, [error, isError])

  return {
    users: data ?? { resources: [], totalPages: 1 },
    isLoading,
    refetchUsers,
  }
}
