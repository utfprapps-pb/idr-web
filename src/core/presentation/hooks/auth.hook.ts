import { useContext } from 'react'

import { AuthContext } from '../contexts'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth should be used within <Provider>')
  }

  return context
}
