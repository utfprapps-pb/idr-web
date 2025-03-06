import type { Option, WithId } from '@/core/domain/types'

export type AnimalDetailsModel = {
  name: string
  breed: Option
}

export type AnimalModel = WithId<AnimalDetailsModel>
