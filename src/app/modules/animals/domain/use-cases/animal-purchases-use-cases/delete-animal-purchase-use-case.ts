import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalPurchaseUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  void
>
