import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalChildBirthUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  void
>
