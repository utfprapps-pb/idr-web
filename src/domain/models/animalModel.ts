import type { Option, WithId } from '../shared/types'

type AnimalDetailsModel = {
  name: string
  breed: Option
}

type AnimalModel = WithId<AnimalDetailsModel>

export type { AnimalDetailsModel, AnimalModel }
