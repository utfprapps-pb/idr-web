import type { AnimalChildBirthDetailsModel } from '../../models/animal-childbirths-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalChildBirthUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  AnimalChildBirthDetailsModel
>
