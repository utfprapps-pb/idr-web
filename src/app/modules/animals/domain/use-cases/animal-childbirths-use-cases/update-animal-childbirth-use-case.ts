import type { AnimalChildBirthDetailsModel } from '../../models/animal-childbirths-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalChildBirthUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalChildBirth: WithId<AnimalChildBirthDetailsModel>
  },
  void
>
