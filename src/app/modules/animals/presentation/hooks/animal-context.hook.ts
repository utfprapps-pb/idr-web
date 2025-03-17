import { useContext } from 'react'

import { AnimalContext } from '../contexts/animal-context'

export function useAnimalContext() {
  const context = useContext(AnimalContext)

  if (!context) {
    throw new Error('useAnimalContext should be used within <AnimalProvider>')
  }

  return context
}
