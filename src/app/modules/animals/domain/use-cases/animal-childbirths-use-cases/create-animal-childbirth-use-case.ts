import type { AnimalChildBirthDetailsModel } from '../../models/animal-childbirths-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalChildBirthUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalChildBirth: AnimalChildBirthDetailsModel
  },
  void
>
