import type { AnimalChildBirthDetailsModel } from '../models/animal-child-births-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalChildBirthUseCase = RequestInterface<
  {
    propertyId: string
    animalChildBirthId: string
  },
  AnimalChildBirthDetailsModel
>
