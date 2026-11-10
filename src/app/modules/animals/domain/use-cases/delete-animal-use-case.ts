import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
  },
  void
>
