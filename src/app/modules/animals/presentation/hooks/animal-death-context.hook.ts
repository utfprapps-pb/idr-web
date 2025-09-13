import { useContext } from 'react'

import { AnimalDeathContext } from '../contexts/animal-death-context'

export function useAnimalDeathContext() {
  const context = useContext(AnimalDeathContext)

  if (!context) {
    throw new Error(
      'useAnimalDeathContext must be used within an <AnimalDeathProvider>'
    )
  }

  return context
}
