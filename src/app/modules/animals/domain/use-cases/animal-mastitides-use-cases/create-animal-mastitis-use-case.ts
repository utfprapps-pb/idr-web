import type { AnimalMastitisDetailsModel } from '../../models/animal-mastitides-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalMastitisUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalMastitis: AnimalMastitisDetailsModel
  },
  void
>
