import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllUsersUseCase } from '@/core/main/factories/use-cases/users-use-cases'

export function useAllUsersQuery(search: string) {
  const getAllUsersUseCase = makeRemoteGetAllUsersUseCase()

  const {
    data: allUsers = [],
    isError,
    isLoading,
    refetch: refetchAllUsers,
  } = useQuery({
    queryKey: ['all-users', search],
    queryFn: () => getAllUsersUseCase.execute(search),
    enabled: !!search,
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar usuários')
  }, [isError])

  return {
    allUsers,
    isLoading,
    refetchAllUsers,
  }
}
