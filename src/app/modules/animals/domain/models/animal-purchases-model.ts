import type { WithId } from '@/core/domain/types'

export type AnimalPurchaseDetailsModel = {
  date: Date
  birthDate: Date
  weight: string
  price: string
}

export type AnimalPurchaseDetailsApiResponse = {
  date: string
  birthDate: string
  weight: string
  price: string
}

export type AnimalPurchaseModel = WithId<{
  date: Date
  birthDate: Date
  weight: string
  price: string
}>

// todo: refactor to be consistent with Api response
export type AnimalPurchaseApiResponse = WithId<{
  date: string
  birthDate: string
  weight: string
  price: string
}>
