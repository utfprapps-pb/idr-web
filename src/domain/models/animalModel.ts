import type { WithId } from '../shared/types'

type AnimalDetailsModel = {
  name: string
  breed: string
}

type AnimalModel = WithId<AnimalDetailsModel>

export type { AnimalDetailsModel, AnimalModel }
