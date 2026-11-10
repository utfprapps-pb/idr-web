import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalMastitisUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  void
>
