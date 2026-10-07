import { useContext } from 'react'

import { CityContext } from '../contexts/city-context'

export function useCityContext() {
  const context = useContext(CityContext)

  if (!context) {
    throw new Error('useCityContext must be used within a <CityProvider>')
  }

  return context
}
