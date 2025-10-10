import type { AnimalInseminationDetailsModel } from '../../models/animal-inseminations-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalInseminationUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  AnimalInseminationDetailsModel
>
