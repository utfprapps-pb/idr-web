import type { AnimalChildbirthDetailsModel } from '../../models/animal-childbirths-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateAnimalChildbirthUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalChildbirth: { id: string } & AnimalChildbirthDetailsModel
  },
  void
>
