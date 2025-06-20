import type { WithId } from '@/core/domain/types'

export type AnimalPregnancyDiagnosisDetailsModel = {
  date: Date
  lastInseminationDate: Date
}

export type AnimalPregnancyDiagnosisModel = WithId<{
  date: string
  lastInseminationDate: string
}>

export type AnimalPregnancyDiagnosisApiResponse = AnimalPregnancyDiagnosisModel
