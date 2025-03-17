import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalChildBirthUseCase = RequestInterface<
  {
    propertyId: string
    animalChildBirthId: string
  },
  void
>
