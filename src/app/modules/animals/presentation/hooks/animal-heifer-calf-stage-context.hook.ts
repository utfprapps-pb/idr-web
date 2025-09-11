import { useContext } from 'react'

import { AnimalHeiferCalfStageContext } from '../contexts/animal-heifer-calf-stage-context'

export function useAnimalHeiferCalfStageContext() {
  const context = useContext(AnimalHeiferCalfStageContext)

  if (!context) {
    throw new Error(
      'useAnimalHeiferCalfStageContext must be used within an <AnimalHeiferCalfStageProvider>'
    )
  }

  return context
}
