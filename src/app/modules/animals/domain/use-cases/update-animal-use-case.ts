import type { AnimalDetailsModel } from '../models/animals-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateAnimalUseCase = RequestInterface<
  {
    propertyId: string
    animal: { id: string } & AnimalDetailsModel
  },
  void
>
