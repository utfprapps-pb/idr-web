import type { Option } from '@/core/domain/types'

export type AnimalDetailsModel = {
  name: string
  breed: Option<string>
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

export type AnimalWriteApiRequest = {
  propertyId: string
  identifier: string
  breedId: string
}
