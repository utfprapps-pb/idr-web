import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { LocalStorageAdapter } from '@/core/infra/cache'
import { makeRemoteGetMeUseCase } from '@/core/main/factories/use-cases/users-use-cases'
import { useIdrNavigate } from '@/core/presentation/hooks/idr-navigation.hook'

import type { UserModel } from '@/core/domain/models/users-model'

type AuthContextProps = {
  signedIn: boolean
  user?: UserModel

  signIn(accessToken: string): void
  signOut(): void
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export function AuthProvider({ children }: PropsWithChildren) {
  const getMeUseCase = makeRemoteGetMeUseCase()
  const { navigateToBasePath, navigateToSignedBasePath } = useIdrNavigate()

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = LocalStorageAdapter.get(
      LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH
    )

    return !!storedAccessToken
  })

  const queryClient = useQueryClient()
  const { isError, isSuccess, data, isLoading } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => getMeUseCase.execute(),
    enabled: signedIn,
    staleTime: Infinity,
  })

  const signIn = useCallback(
    (accessToken: string) => {
      LocalStorageAdapter.set(
        LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH,
        accessToken
      )
      navigateToSignedBasePath()
      setSignedIn(true)
    },
    [navigateToSignedBasePath]
  )

  const signOut = useCallback(() => {
    LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH)
    LocalStorageAdapter.set(
      LocalStorageAdapter.LOCAL_STORAGE_KEYS.REFRESH_TOKEN
    )
    setSignedIn(false)
    queryClient.removeQueries({ queryKey: ['users', 'me'] })
    navigateToBasePath()
  }, [navigateToBasePath, queryClient])

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!')
      signOut()
    }
  }, [isError, signOut])

  useEffect(() => {
    const handleTokenExpired = () => signOut()
    window.addEventListener('auth:token-expired', handleTokenExpired)
    return () =>
      window.removeEventListener('auth:token-expired', handleTokenExpired)
  }, [signOut])

  const providerProps = useMemo(
    () => ({
      signedIn: signedIn && isSuccess,
      user: data,
      signIn,
      signOut,
    }),
    [data, isSuccess, signIn, signOut, signedIn]
  )

  return (
    <AuthContext.Provider value={providerProps}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
AuthProvider.displayName = 'AuthProvider'
