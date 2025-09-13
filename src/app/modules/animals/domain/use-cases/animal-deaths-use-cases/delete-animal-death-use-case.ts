import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalDeathUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  void
>
