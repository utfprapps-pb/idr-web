import { useContext } from 'react'

import { AnimalContext } from '../contexts/animalContext'

export const useAnimalContext = () => {
  const context = useContext(AnimalContext)

  if (!context) {
    throw new Error('useAnimalContext should be used within <AnimalProvider>')
  }

  return context
}
