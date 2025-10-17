import type { Option, WithId } from '@/core/domain/types'

export type CultivationDiseaseInfestationType = 'LOW' | 'MEDIUM' | 'HIGH'

export type CultivationDiseaseDetailsModel = {
  cultivation: Option
  disease: Option
  infestationType: CultivationDiseaseInfestationType
}

export type CultivationDiseaseDetailsApiResponse = {
  cultivation: {
    id: number
    name: string
  }
  disease: {
    id: number
    name: string
  }
  infestationType: string
}

export type CultivationDiseaseModel = WithId<{
  cultivation: string
  disease: string
  infestationType: string
}>

// todo: refactor to be consistent with Api response
export type CultivationDiseaseApiResponse = WithId<{
  cultivation: string
  disease: string
  infestationType: string
}>
