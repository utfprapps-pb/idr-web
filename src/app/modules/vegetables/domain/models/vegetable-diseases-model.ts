import type { Option, WithId } from '@/core/domain/types'

export type VegetableDiseaseInfestationType = 'LOW' | 'MEDIUM' | 'HIGH'

export type VegetableDiseaseDetailsModel = {
  vegetable: Option
  disease: Option
  infestationType: VegetableDiseaseInfestationType
}

export type VegetableDiseaseDetailsApiResponse = {
  vegetable: Option
  disease: Option
  infestationType: string
}

export type VegetableDiseaseModel = WithId<{
  vegetable: string
  disease: string
  infestationType: string
}>

// todo: refactor to be consistent with Api response
export type VegetableDiseaseApiResponse = WithId<{
  vegetable: string
  disease: string
  infestationType: string
}>
