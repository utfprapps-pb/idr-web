import type { AnimalDetailsModel } from '@/domain/models/animalModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type ICreateAnimal = IRequestInterface<
  { propertyId: string; animal: AnimalDetailsModel },
  void
>
