import { useQuery } from '@tanstack/react-query'

import { makeRemoteGetUserUseCase } from '../../../main/factories/use-cases'

export function useUserQuery({ userId }: { userId?: string }) {
  const getUserUseCase = makeRemoteGetUserUseCase()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'users', userId],
    queryFn: () => getUserUseCase.execute({ userId: userId! }),
    enabled: !!userId,
  })

  return { user: data, isLoading }
}
