import type { Option, WithId } from '@/core/domain/types'

export type AnimalInseminationDetailsModel = {
  date: Date
  sire: Option
}

export type AnimalInseminationDetailsApiResponse = {
  date: string
  sire: Option
}

export type AnimalInseminationModel = WithId<{
  date: Date
  sire: string
}>

// todo: refactor to be consistent with Api response
export type AnimalInseminationApiResponse = WithId<{
  date: string
  sire: string
}>
