import { type PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuth } from '@/core/presentation/hooks'

import { generateRoutePath } from '../routes/generate-route-path'

export function AdminRouteProxy({ children }: PropsWithChildren) {
  const { user, signedIn } = useAuth()

  if (signedIn && user && user.role !== 'ADMIN') {
    return <Navigate to={generateRoutePath('HOME')} />
  }

  return children
}
