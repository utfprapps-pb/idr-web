import { useContext } from 'react'

import { CultivationDiseaseContext } from '../contexts/cultivation-disease-context'

export function useCultivationDiseaseContext() {
  const context = useContext(CultivationDiseaseContext)

  if (!context) {
    throw new Error(
      'useCultivationDiseaseContext must be used within an <CultivationDiseaseProvider>'
    )
  }

  return context
}
