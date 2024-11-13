import { PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { LocalStorageAdapter } from '@/infra/cache'
import { LoggedContainer } from '@/presentation/containers'

import { generateRoutePath } from '../routes/generateRoutePath'

export const PrivateRouteProxy: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const token = LocalStorageAdapter.get(
    LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH
  )
  if (token) return <LoggedContainer>{children}</LoggedContainer>

  return <Navigate to={generateRoutePath('LOGIN')} />
}
