import { useContext } from 'react'

import { ImprovementContext } from '../contexts/improvementContext'

export const useImprovementContext = () => {
  const context = useContext(ImprovementContext)

  if (!context) {
    throw new Error(
      'useImprovementContext should be used within <ImprovementProvider>'
    )
  }

  return context
}
