import { useContext } from 'react'

import { AnimalMastitisContext } from '../contexts/animal-mastitis-context'

export function useAnimalMastitisContext() {
  const context = useContext(AnimalMastitisContext)

  if (!context) {
    throw new Error(
      'useAnimalMastitisContext must be used within an <AnimalMastitisProvider>'
    )
  }

  return context
}
