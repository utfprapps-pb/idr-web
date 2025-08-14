import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalChildbirthUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  void
>
