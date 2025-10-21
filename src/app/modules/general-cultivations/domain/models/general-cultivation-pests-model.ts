import type { WithId } from '@/core/domain/types'

export type GeneralCultivationPestDetailsModel = {
  name: string
}

export type GeneralCultivationPestDetailsApiResponse = {
  name: string
}

export type GeneralCultivationPestModel = WithId<{
  name: string
}>

// todo: refactor to be consistent with Api response
export type GeneralCultivationPestApiResponse = WithId<{
  name: string
}>
