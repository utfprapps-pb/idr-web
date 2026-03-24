import { useContext } from 'react'

import { GeneralCultivationDiseaseContext } from '../contexts/general-cultivation-disease-context'

export function useGeneralCultivationDiseaseContext() {
  const context = useContext(GeneralCultivationDiseaseContext)

  if (!context) {
    throw new Error(
      'useGeneralCultivationDiseaseContext should be used within <GeneralCultivationDiseaseProvider>'
    )
  }

  return context
}
