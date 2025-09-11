import { useContext } from 'react'

import { ForageContext } from '../contexts/forage-context'

export function useForageContext() {
  const context = useContext(ForageContext)

  if (!context) {
    throw new Error('useForageContext should be used within <ForageProvider>')
  }

  return context
}
