import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalPurchaseUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  void
>
