import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalSaleUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  void
>
