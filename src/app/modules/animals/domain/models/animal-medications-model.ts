import type { Option, WithId } from '@/core/domain/types'

export type AnimalMedicationApplicationMethod =
  | 'IM'
  | 'IV'
  | 'SC'
  | 'IntraMammary'
  | 'PourOn'

export type AnimalMedicationDetailsModel = {
  date: Date
  product: Option
  activeIngredient: Option
  appliedDose: string
  applicationMethod: AnimalMedicationApplicationMethod
}

export type AnimalMedicationDetailsApiResponse = {
  date: string
  product: Option
  activeIngredient: Option
  appliedDose: string
  applicationMethod: string
}

export type AnimalMedicationModel = WithId<{
  date: Date
  product: string
  activeIngredient: string
  appliedDose: string
  applicationMethod: string
}>

export type AnimalMedicationApiResponse = WithId<{
  date: string
  product: string
  activeIngredient: string
  appliedDose: string
  applicationMethod: string
}>
