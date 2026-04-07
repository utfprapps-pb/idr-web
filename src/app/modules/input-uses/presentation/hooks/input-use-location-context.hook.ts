import { useContext } from 'react'

import { InputUseLocationContext } from '../contexts/input-use-location-context'

export function useInputUseLocationContext() {
  const context = useContext(InputUseLocationContext)

  if (!context) {
    throw new Error(
      'useInputUseLocationContext must be used within a InputUseLocationProvider'
    )
  }

  return context
}
