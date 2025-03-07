import { useContext } from 'react'

import { ImprovementContext } from '../contexts/improvement-context'

export function useImprovementContext() {
  const context = useContext(ImprovementContext)

  if (!context) {
    throw new Error(
      'useImprovementContext must be used within a <ImprovementProvider>'
    )
  }

  return context
}
