import type { AnimalDeathDetailsModel } from '../../models/animal-deaths-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalDeathUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  AnimalDeathDetailsModel
>
