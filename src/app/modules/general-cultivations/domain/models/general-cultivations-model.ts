import type { WithId } from '../../../../../core/domain/types'

export type GeneralCultivationType = 'FORAGE' | 'CONCENTRATE' | 'MINERAL'

export type GeneralCultivationDetailsModel = {
  name: string
  type: GeneralCultivationType
}

export type GeneralCultivationDetailsApiResponse = {
  name: string
  type: string
}

export type GeneralCultivationModel = WithId<{
  name: string
  type: GeneralCultivationType
}>

export type GeneralCultivationApiResponse = WithId<{
  name: string
  type: string
}>
