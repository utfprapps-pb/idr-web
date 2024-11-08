import { createContext } from 'react'

import type { UserModel } from '@/domain/models/userModel'

type AuthContextProps = {
  signedIn: boolean
  user?: UserModel

  signIn(accessToken: string): void
  signOut(): void
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)
