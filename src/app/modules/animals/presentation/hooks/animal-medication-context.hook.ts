import { useContext } from 'react'

import { AnimalMedicationContext } from '../contexts/animal-medication-context'

export function useAnimalMedicationContext() {
  const context = useContext(AnimalMedicationContext)

  if (!context) {
    throw new Error(
      'useAnimalMedicationContext must be used within an <AnimalMedicationProvider>'
    )
  }

  return context
}
