import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllUsersUseCase } from '@/core/main/factories/use-cases/users-use-cases'

import type { Filters, Option } from '@/core/domain/types'

type Props = {
  filters: Filters<Option>
}

export function useAllUsersQuery({ filters }: Props) {
  const getAllUsersUseCase = makeRemoteGetAllUsersUseCase()

  const {
    data: allUsers = [],
    isError,
    error,
    isLoading,
    refetch: refetchAllUsers,
  } = useQuery({
    queryKey: ['all-users', { filters }],
    queryFn: () =>
      getAllUsersUseCase.execute({
        filters,
        pagination: { page: 0, perPage: 30 },
      }),
    enabled: !!filters,
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar usuários')
  }, [error, isError])

  return {
    allUsers,
    isLoading,
    refetchAllUsers,
  }
}
