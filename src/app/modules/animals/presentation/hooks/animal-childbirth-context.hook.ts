import { useContext } from 'react'

import { AnimalChildBirthContext } from '../contexts/animal-childbirth-context'

export function useAnimalChildBirthContext() {
  const context = useContext(AnimalChildBirthContext)

  if (!context) {
    throw new Error(
      'useAnimalChildBirthContext must be used within an <AnimalChildBirthProvider>'
    )
  }

  return context
}
