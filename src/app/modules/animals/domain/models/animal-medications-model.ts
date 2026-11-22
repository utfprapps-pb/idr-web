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

/** Formato real da API (`GetMedicationByIdOutput` = `ListMedicationOutput`), usado no GET e em cada item da busca. */
export type AnimalMedicationApiResponse = {
  id: string
  animalId: string
  /** UUID do catálogo `/products`, ou `null` para produto não cadastrado. */
  productId: string | null
  /** Nome gravado na medicação (do catálogo, quando há `productId`). */
  productName: string
  activePrinciple: string | null
  applicationDate: string
  appliedDose: string
  applicationWay: string
}

export type AnimalMedicationModel = {
  id: string
  date: Date
  product: string
  activeIngredient: string
  appliedDose: string
  applicationMethod: string
}
