import type { AnimalDeathDetailsModel } from '../../models/animal-deaths-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalDeathUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalDeath: WithId<AnimalDeathDetailsModel>
  },
  void
>
