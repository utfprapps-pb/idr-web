import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalChildbirthUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  void
>
