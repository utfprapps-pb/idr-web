import type { Option } from '@/core/domain/types'

export type AnimalDetailsModel = {
  name: string
  breed: Option
  weight: string
  ecc: string
  milkProduction: string
}

export type AnimalModel = {
  id: string
  name: string
  breed: string
  weight: string
  ecc: string
  milkProduction: string
}

/** Formato real do DTO do backend — milkProduction não existe lá, nunca é fabricado. */
export type AnimalApiResponse = {
  id: string
  identifier: string
  breed: {
    id: number
    breedName: string
  }
  currentWeight: number | null
  ecc: number | null
}

export type AnimalDetailsApiResponse = AnimalApiResponse

export type AnimalWriteApiRequest = {
  propertyId: string
  identifier: string
  breed: { id: number }
}
