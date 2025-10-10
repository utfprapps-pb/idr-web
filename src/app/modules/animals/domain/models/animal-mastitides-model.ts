import type { WithId } from '@/core/domain/types'

export type AnimalMastitisCmtResults =
  | 'PLUS-ONE'
  | 'PLUS-TWO'
  | 'PLUS-THREE'
  | 'ABSENT'

export type AnimalMastitisType = 'CLINICAL' | 'SUBCLINICAL'

export type AnimalMastitisDetailsModel = {
  date: Date
  type: AnimalMastitisType
  ad: AnimalMastitisCmtResults
  ae: AnimalMastitisCmtResults
  pd: AnimalMastitisCmtResults
  pe: AnimalMastitisCmtResults
}

export type AnimalMastitisDetailsApiResponse = {
  date: string
  type: string
  ad: string
  ae: string
  pd: string
  pe: string
}

export type AnimalMastitisModel = WithId<{
  date: Date
  type: AnimalMastitisType
  ad: AnimalMastitisCmtResults
  ae: AnimalMastitisCmtResults
  pd: AnimalMastitisCmtResults
  pe: AnimalMastitisCmtResults
}>

export type AnimalMastitisApiResponse = WithId<{
  date: string
  type: string
  ad: string
  ae: string
  pd: string
  pe: string
}>
