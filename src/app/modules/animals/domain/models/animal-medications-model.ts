import type { Option } from '@/core/domain/types'

export type AnimalMedicationApplicationMethod =
  | 'IM'
  | 'IV'
  | 'SC'
  | 'IntraMammary'
  | 'PourOn'

export type AnimalMedicationDetailsModel = {
  date: Date
  product: Option
  appliedDose: string
  applicationMethod: AnimalMedicationApplicationMethod
}

export type AnimalMedicationDetailsApiResponse = {
  date: string
  product: Option
  appliedDose: string
  applicationMethod: string
}

export type AnimalMedicationModel = {
  id: string
  date: Date
  product: string
  activeIngredient: string
  appliedDose: string
  applicationMethod: string
}

export type AnimalMedicationApiResponse = {
  id: string
  date: string
  product: string
  activeIngredient: string
  appliedDose: string
  applicationMethod: string
}
