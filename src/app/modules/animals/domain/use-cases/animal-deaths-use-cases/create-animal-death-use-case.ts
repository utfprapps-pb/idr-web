import type { AnimalDeathDetailsModel } from '../../models/animal-deaths-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalDeathUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalDeath: AnimalDeathDetailsModel
  },
  void
>
