import type { AnimalChildbirthDetailsModel } from '../../models/animal-childbirths-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalChildbirthUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  AnimalChildbirthDetailsModel
>
