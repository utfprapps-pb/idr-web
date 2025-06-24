import type { WithId } from '@/core/domain/types'

export type AnimalPregnancyDiagnosisDetailsModel = {
  date: Date
  lastInseminationDate: Date
}

export type AnimalPregnancyDiagnosisDetailsApiResponse = {
  date: string
  lastInseminationDate: string
}

export type AnimalPregnancyDiagnosisModel = WithId<{
  date: Date
  lastInseminationDate: Date
}>

export type AnimalPregnancyDiagnosisApiResponse = WithId<{
  date: string
  lastInseminationDate: string
}>
