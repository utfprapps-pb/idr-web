import type { Option, WithId } from '@/core/domain/types'

export type AnimalDetailsModel = {
  name: string
  breed: Option
}

export type AnimalModel = WithId<{
  name: string
  breed: string
}>

// todo: refactor to be consistent with Api response
export type AnimalApiResponse = AnimalModel
