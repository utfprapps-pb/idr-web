import type { AnimalDetailsModel } from '@/domain/models/animalModel'
import type { IRequestInterface } from '@/domain/shared/types'
import type { WithId } from '@/domain/shared/types/withId'

export type IUpdateAnimal = IRequestInterface<
  {
    propertyId: string
    animal: WithId<AnimalDetailsModel>
  },
  void
>
