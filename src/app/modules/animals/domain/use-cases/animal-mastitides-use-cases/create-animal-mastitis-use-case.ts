import type { AnimalMastitisDetailsModel } from '../../models/animal-mastitides-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalMastitisUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalMastitis: AnimalMastitisDetailsModel
  },
  void
>
