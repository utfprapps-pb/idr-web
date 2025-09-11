import { useContext } from 'react'

import { AnimalChildbirthContext } from '../contexts/animal-childbirth-context'

export function useAnimalChildbirthContext() {
  const context = useContext(AnimalChildbirthContext)

  if (!context) {
    throw new Error(
      'useAnimalChildbirthContext must be used within an <AnimalChildbirthProvider>'
    )
  }

  return context
}
