import type { AnimalInseminationDetailsModel } from '../../models/animal-inseminations-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalInseminationUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  AnimalInseminationDetailsModel
>
