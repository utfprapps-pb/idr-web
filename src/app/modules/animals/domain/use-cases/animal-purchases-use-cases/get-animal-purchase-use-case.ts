import type { AnimalPurchaseDetailsModel } from '../../models/animal-purchases-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalPurchaseUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  AnimalPurchaseDetailsModel
>
