import type { Option, WithId } from '@/core/domain/types'

export type CultivationPestInfestationType = 'LOW' | 'MEDIUM' | 'HIGH'

export type CultivationPestDetailsModel = {
  cultivation: Option
  pest: Option
  infestationType: CultivationPestInfestationType
}

export type CultivationPestDetailsApiResponse = {
  cultivation: {
    id: number
    name: string
  }
  pest: {
    id: number
    name: string
  }
  infestationType: string
}

export type CultivationPestModel = WithId<{
  cultivation: string
  pest: string
  infestationType: string
}>

// todo: refactor to be consistent with Api response
export type CultivationPestApiResponse = WithId<{
  cultivation: string
  pest: string
  infestationType: string
}>
