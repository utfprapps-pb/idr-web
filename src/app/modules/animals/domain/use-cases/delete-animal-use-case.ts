import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
  },
  void
>
