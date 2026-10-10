import type { AnimalDeathDetailsModel } from '../../models/animal-deaths-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateAnimalDeathUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalDeath: { id: string } & AnimalDeathDetailsModel
  },
  void
>
