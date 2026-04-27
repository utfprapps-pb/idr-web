import { useContext } from 'react'

import { ForageAvailabilityContext } from '../contexts/forage-availability-context'

export function useForageAvailabilityContext() {
  const context = useContext(ForageAvailabilityContext)

  if (!context) {
    throw new Error(
      'useForageAvailabilityContext must be used within an ForageAvailabilityProvider'
    )
  }

  return context
}
