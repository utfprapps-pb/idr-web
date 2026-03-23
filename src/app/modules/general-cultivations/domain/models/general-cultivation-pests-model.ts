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

export type GeneralCultivationPestApiResponse = WithId<{
  name: string
}>
