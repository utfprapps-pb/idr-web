import type { Option, WithId } from '@/core/domain/types'

export type AnimalApiResponse = {
  id: number
  name: string
  breed: Option
}

export type AnimalDetailsModel = {
  propertyId: string
  name: string
  breed: Option
}

export type AnimalModel = WithId<AnimalDetailsModel>
