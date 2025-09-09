import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalInseminationUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  void
>
