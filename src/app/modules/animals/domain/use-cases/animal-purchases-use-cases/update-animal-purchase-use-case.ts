import type { AnimalPurchaseDetailsModel } from '../../models/animal-purchases-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalPurchaseUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalPurchase: WithId<AnimalPurchaseDetailsModel>
  },
  void
>
