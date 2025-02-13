import type { IRequestInterface } from '@/domain/shared/types'

export type IDeleteAnimal = IRequestInterface<
  {
    propertyId: string
    animalId: string
  },
  void
>
