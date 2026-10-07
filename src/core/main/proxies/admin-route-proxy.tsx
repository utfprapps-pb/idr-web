import { type PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { ADMIN_ROLE } from '@/app/modules/users/domain/models/users-model'
import { useAuth } from '@/core/presentation/hooks'

import { generateRoutePath } from '../routes/generate-route-path'

export function AdminRouteProxy({ children }: PropsWithChildren) {
  const { user, signedIn } = useAuth()

  if (signedIn && user && user.role !== ADMIN_ROLE) {
    return <Navigate to={generateRoutePath('HOME')} />
  }

  return children
}
