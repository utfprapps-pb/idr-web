import { useContext } from 'react'

import { AnimalSaleContext } from '../contexts/animal-sale-context'

export function useAnimalSaleContext() {
  const context = useContext(AnimalSaleContext)

  if (!context) {
    throw new Error(
      'useAnimalSaleContext must be used within an <AnimalSaleProvider>'
    )
  }

  return context
}
