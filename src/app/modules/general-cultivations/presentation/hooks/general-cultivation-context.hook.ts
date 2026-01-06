import { useContext } from 'react'

import { GeneralCultivationContext } from '../contexts/general-cultivation-context'

export function useGeneralCultivationContext() {
  const context = useContext(GeneralCultivationContext)

  if (!context) {
    throw new Error(
      'useGeneralCultivationContext should be used within <GeneralCultivationProvider>'
    )
  }

  return context
}
