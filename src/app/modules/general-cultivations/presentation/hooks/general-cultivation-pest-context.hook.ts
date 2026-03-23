import { useContext } from 'react'

import { GeneralCultivationPestContext } from '../contexts/general-cultivation-pest-context'

export function useGeneralCultivationPestContext() {
  const context = useContext(GeneralCultivationPestContext)

  if (!context) {
    throw new Error(
      'useGeneralCultivationPestContext should be used within <GeneralCultivationPestProvider>'
    )
  }

  return context
}
