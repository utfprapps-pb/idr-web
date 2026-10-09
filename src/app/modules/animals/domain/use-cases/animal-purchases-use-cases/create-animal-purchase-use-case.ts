import type { AnimalPurchaseDetailsModel } from '../../models/animal-purchases-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalPurchaseUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalPurchase: AnimalPurchaseDetailsModel
  },
  void
>
