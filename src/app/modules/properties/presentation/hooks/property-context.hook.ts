import { useContext } from 'react'

import { PropertyContext } from '../contexts/property-context'

export function usePropertyContext() {
  const context = useContext(PropertyContext)

  if (!context) {
    throw new Error(
      'usePropertyContext should be used within <PropertyProvider>'
    )
  }

  return context
}
