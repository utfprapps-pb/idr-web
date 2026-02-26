import type { WithId } from '../../../../../core/domain/types'

export type GeneralCultivationType = 'FORAGE' | 'CONCENTRATE' | 'MINERAL'

export type GeneralCultivationDetailsModel = {
  name: string
  type: GeneralCultivationType
  crudeProtein: number
  totalDigestibleNutrients: number
  dryMatter: number
  calcium: number
  phosphorus: number
  nonFibrousCarbohydrates: number
  etherExtract: number
  rumenDegradableProtein: number
}

export type GeneralCultivationDetailsApiResponse = {
  name: string
  type: string
  crudeProtein: number
  totalDigestibleNutrients: number
  dryMatter: number
  calcium: number
  phosphorus: number
  nonFibrousCarbohydrates: number
  etherExtract: number
  rumenDegradableProtein: number
}

export type GeneralCultivationModel = WithId<{
  name: string
  type: GeneralCultivationType
  crudeProtein: number
  totalDigestibleNutrients: number
  dryMatter: number
  calcium: number
  phosphorus: number
  nonFibrousCarbohydrates: number
  etherExtract: number
  rumenDegradableProtein: number
}>

export type GeneralCultivationApiResponse = WithId<{
  name: string
  type: string
  crudeProtein: number
  totalDigestibleNutrients: number
  dryMatter: number
  calcium: number
  phosphorus: number
  nonFibrousCarbohydrates: number
  etherExtract: number
  rumenDegradableProtein: number
}>
