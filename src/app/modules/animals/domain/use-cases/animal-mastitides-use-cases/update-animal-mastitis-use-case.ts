import type { AnimalMastitisDetailsModel } from '../../models/animal-mastitides-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateAnimalMastitisUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalMastitis: { id: string } & AnimalMastitisDetailsModel
  },
  void
>
