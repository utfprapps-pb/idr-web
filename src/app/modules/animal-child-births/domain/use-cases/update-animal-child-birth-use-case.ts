import type { AnimalChildBirthDetailsModel } from '../models/animal-child-births-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalChildBirthUseCase = RequestInterface<
  {
    propertyId: string
    animalChildBirth: WithId<AnimalChildBirthDetailsModel>
  },
  void
>
