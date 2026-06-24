import { useContext } from 'react'

import { UsersContext } from '../contexts/users-context'

export function useUsersContext() {
  const context = useContext(UsersContext)

  if (!context) {
    throw new Error('useUsersContext should be used within <UsersProvider>')
  }

  return context
}
