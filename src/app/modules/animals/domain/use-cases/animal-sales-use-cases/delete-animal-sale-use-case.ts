import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalSaleUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  void
>
