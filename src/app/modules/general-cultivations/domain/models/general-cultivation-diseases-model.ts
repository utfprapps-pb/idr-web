import type { WithId } from '@/core/domain/types'

export type GeneralCultivationDiseaseDetailsModel = {
  name: string
}

export type GeneralCultivationDiseaseDetailsApiResponse = {
  name: string
}

export type GeneralCultivationDiseaseModel = WithId<{
  name: string
}>

// todo: refactor to be consistent with Api response
export type GeneralCultivationDiseaseApiResponse = WithId<{
  name: string
}>
