import { useQuery } from '@tanstack/react-query'

import { makeRemoteGetUserPermissionsUseCase } from '../../../main/factories/use-cases'

export function useUserPermissionsQuery({ userId }: { userId?: string }) {
  const getUserPermissionsUseCase = makeRemoteGetUserPermissionsUseCase()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'users', userId, 'permissions'],
    queryFn: () => getUserPermissionsUseCase.execute({ userId: userId! }),
    enabled: !!userId,
  })

  return { permissions: data, isLoading }
}
