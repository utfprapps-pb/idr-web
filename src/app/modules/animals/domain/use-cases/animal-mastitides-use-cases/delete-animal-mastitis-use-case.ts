import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalMastitisUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  void
>
