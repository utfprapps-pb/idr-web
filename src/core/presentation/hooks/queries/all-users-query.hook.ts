import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllUsersUseCase } from '@/core/main/factories/use-cases/users-use-cases'
import { toOption } from '@/core/utils/object/to-option'

import type { UserModel } from '@/core/domain/models/users-model'
import type { Filters } from '@/core/domain/types'

type Props = {
  filters: Filters<UserModel>
}

export function useAllUsersQuery({ filters }: Props) {
  const getAllUsersUseCase = makeRemoteGetAllUsersUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllUsers,
  } = useQuery({
    queryKey: ['all-users', { filters }],
    queryFn: () =>
      getAllUsersUseCase.execute({
        filters,
        pagination: { page: 1, perPage: 30 },
      }),
    enabled: !!filters,
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar usuários')
  }, [error, isError])

  return {
    allUsers:
      data?.resources.map((resource) => toOption(resource, 'name')) ?? [],
    isLoading,
    refetchAllUsers,
  }
}
