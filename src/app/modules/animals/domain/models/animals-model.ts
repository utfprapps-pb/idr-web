import type { Option, WithId } from '@/core/domain/types'

export type AnimalDetailsModel = {
  name: string
  breed: Option
  weight: string
  ecc: string
  milkProduction: string
}

export type AnimalDetailsApiResponse = {
  name: string
  breed: Option
  weight: string
  ecc: string
  milkProduction: string
}

export type AnimalModel = WithId<{
  name: string
  breed: string
  weight: string
  ecc: string
  milkProduction: string
}>

// todo: refactor to be consistent with Api response
export type AnimalApiResponse = AnimalModel
