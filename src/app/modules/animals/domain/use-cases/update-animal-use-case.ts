import type { AnimalDetailsModel } from '../models/animals-model'
import type { RequestInterface, WithId } from '@/core/domain/types'

export type UpdateAnimalUseCase = RequestInterface<
  {
    propertyId: number
    animal: WithId<AnimalDetailsModel>
  },
  void
>
