import { useContext } from 'react'

import { AnimalInseminationContext } from '../contexts/animal-insemination-context'

export function useAnimalInseminationContext() {
  const context = useContext(AnimalInseminationContext)

  if (!context) {
    throw new Error(
      'useAnimalInseminationContext must be used within an <AnimalInseminationProvider>'
    )
  }

  return context
}
