import { useContext } from 'react'

import { CultivationPestContext } from '../contexts/cultivation-pest-context'

export function useCultivationPestContext() {
  const context = useContext(CultivationPestContext)

  if (!context) {
    throw new Error(
      'useCultivationPestContext must be used within an <CultivationPestProvider>'
    )
  }

  return context
}
