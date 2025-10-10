import type { AnimalInseminationDetailsModel } from '../../models/animal-inseminations-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalInseminationUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalInsemination: AnimalInseminationDetailsModel
  },
  void
>
