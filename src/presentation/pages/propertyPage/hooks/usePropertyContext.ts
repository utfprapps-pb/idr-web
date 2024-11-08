import { useContext } from 'react'

import { PropertyContext } from '../contexts/propertyContext'

export const usePropertyContext = () => {
  const context = useContext(PropertyContext)

  if (!context) {
    throw new Error(
      'usePropertyContext should be used within <PropertyProvider>'
    )
  }

  return context
}
