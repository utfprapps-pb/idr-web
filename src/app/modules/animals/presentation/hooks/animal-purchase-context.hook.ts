import { useContext } from 'react'

import { AnimalPurchaseContext } from '../contexts/animal-purchase-context'

export function useAnimalPurchaseContext() {
  const context = useContext(AnimalPurchaseContext)

  if (!context) {
    throw new Error(
      'useAnimalPurchaseContext must be used within an <AnimalPurchaseProvider>'
    )
  }

  return context
}
