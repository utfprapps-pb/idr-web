import { PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { LocalStorageAdapter } from '@/core/infra/cache'
import { LoggedContainer } from '@/core/presentation/containers'
import { SyncProvider } from '@/core/providers/sync-provider'

import { generateRoutePath } from '../routes/generate-route-path'

export function PrivateRouteProxy({ children }: PropsWithChildren) {
  const token = LocalStorageAdapter.get(
    LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH
  )

  if (token)
    return (
      <SyncProvider>
        <LoggedContainer>{children}</LoggedContainer>
      </SyncProvider>
    )

  return <Navigate to={generateRoutePath('LOGIN')} />
}
