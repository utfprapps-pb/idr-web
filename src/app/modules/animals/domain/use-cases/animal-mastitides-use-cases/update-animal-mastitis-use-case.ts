import type { AnimalMastitisDetailsModel } from '../../models/animal-mastitides-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalMastitisUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalMastitis: WithId<AnimalMastitisDetailsModel>
  },
  void
>
