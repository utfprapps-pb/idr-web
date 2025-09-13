import { useContext } from 'react'

import { AnimalPregnancyDiagnosisContext } from '../contexts/animal-pregnancy-diagnosis-context'

export function useAnimalPregnancyDiagnosisContext() {
  const context = useContext(AnimalPregnancyDiagnosisContext)

  if (!context) {
    throw new Error(
      'useAnimalPregnancyDiagnosisContext must be used within an <AnimalPregnancyDiagnosisProvider>'
    )
  }

  return context
}
