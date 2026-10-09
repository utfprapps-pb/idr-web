import type { Option } from '@/core/domain/types'

export type AnimalInseminationDetailsModel = {
  date: Date
  sire: Option<string>
}

export type AnimalInseminationDetailsApiResponse = {
  iaDate: string
  bull: Option<string>
}

export type AnimalInseminationModel = {
  id: string
  date: Date
  sire: string
}

// todo: refactor to be consistent with Api response
export type AnimalInseminationApiResponse = {
  id: string
  date: string
  sire: string
}
