import type { AnimalDetailsModel } from '@/domain/models/animalModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type IGetAnimal = IRequestInterface<
  {
    propertyId: string
    animalId: string
  },
  AnimalDetailsModel
>
