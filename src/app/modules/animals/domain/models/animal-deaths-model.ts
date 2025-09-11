import type { WithId } from '@/core/domain/types'

export type AnimalDeathDetailsModel = {
  date: Date
  reason: string
}

export type AnimalDeathDetailsApiResponse = {
  date: string
  reason: string
}

export type AnimalDeathModel = WithId<{
  date: Date
  reason: string
}>

// todo: refactor to be consistent with Api response
export type AnimalDeathApiResponse = WithId<{
  date: string
  reason: string
}>
