import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalInseminationUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  void
>
