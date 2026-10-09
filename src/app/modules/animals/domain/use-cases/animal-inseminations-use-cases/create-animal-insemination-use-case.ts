import type { AnimalInseminationDetailsModel } from '../../models/animal-inseminations-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalInseminationUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalInsemination: AnimalInseminationDetailsModel
  },
  void
>
