import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { LocalStorageAdapter } from '@/infra/cache'
import { UserDataFactory } from '@/main/factories/useCases/user'
import { useIdrNavigate } from '@/presentation/hooks/useIdrNavigate'

import { AuthContext } from './context'

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const meService = UserDataFactory.makeRemoteMe()
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
    queryFn: async () => meService.execute(),
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
