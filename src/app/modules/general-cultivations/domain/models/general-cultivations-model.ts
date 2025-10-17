import type { WithId } from '../../../../../core/domain/types'

export type GeneralCultivationDetailsModel = {
  name: string
}

export type GeneralCultivationDetailsApiResponse = {
  name: string
}

export type GeneralCultivationModel = WithId<{
  name: string
}>

export type GeneralCultivationApiResponse = WithId<{
  name: string
}>
