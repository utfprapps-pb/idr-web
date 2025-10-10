import type { AnimalMastitisDetailsModel } from '../../models/animal-mastitides-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalMastitisUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  AnimalMastitisDetailsModel
>
