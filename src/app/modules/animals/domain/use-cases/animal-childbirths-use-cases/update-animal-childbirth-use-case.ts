import type { AnimalChildbirthDetailsModel } from '../../models/animal-childbirths-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalChildbirthUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalChildbirth: WithId<AnimalChildbirthDetailsModel>
  },
  void
>
