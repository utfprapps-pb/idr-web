import type { WithId } from '../../../../../core/domain/types'

export type GeneralCultivationDetailsModel = {
  name: string
  type: 'FORAGE' | 'CONCENTRATE' | 'MINERAL'
}

export type GeneralCultivationDetailsApiResponse = {
  name: string
  type: 'FORAGE' | 'CONCENTRATE' | 'MINERAL'
}

export type GeneralCultivationModel = WithId<{
  name: string
  type: 'FORAGE' | 'CONCENTRATE' | 'MINERAL'
}>

export type GeneralCultivationApiResponse = WithId<{
  name: string
  type: 'FORAGE' | 'CONCENTRATE' | 'MINERAL'
}>
