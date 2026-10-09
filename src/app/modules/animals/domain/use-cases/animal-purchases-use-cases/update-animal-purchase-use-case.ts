import type { AnimalPurchaseDetailsModel } from '../../models/animal-purchases-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateAnimalPurchaseUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalPurchase: { id: string } & AnimalPurchaseDetailsModel
  },
  void
>
