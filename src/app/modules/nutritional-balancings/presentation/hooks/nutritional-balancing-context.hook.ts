import { useContext } from 'react'

import { NutritionalBalancingContext } from '../contexts/nutritional-balancing-context'

export function useNutritionalBalancingContext() {
  const context = useContext(NutritionalBalancingContext)

  if (!context) {
    throw new Error(
      'useNutritionalBalancingContext should be used within <NutritionalBalancingProvider>'
    )
  }

  return context
}
