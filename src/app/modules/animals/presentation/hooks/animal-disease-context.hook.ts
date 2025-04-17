import { useContext } from 'react'

import { AnimalDiseaseContext } from '../contexts/animal-disease-context'

export function useAnimalDiseaseContext() {
  const context = useContext(AnimalDiseaseContext)

  if (!context) {
    throw new Error(
      'useAnimalDiseaseContext must be used within an <AnimalDiseaseProvider>'
    )
  }

  return context
}
