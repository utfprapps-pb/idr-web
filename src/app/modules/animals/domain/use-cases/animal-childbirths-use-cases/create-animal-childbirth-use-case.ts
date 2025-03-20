import type { AnimalChildbirthDetailsModel } from '../../models/animal-childbirths-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalChildbirthUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalChildbirth: AnimalChildbirthDetailsModel
  },
  void
>
