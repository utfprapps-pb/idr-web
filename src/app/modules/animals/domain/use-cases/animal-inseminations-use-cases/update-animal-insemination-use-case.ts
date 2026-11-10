import type { AnimalInseminationDetailsModel } from '../../models/animal-inseminations-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateAnimalInseminationUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalInsemination: { id: string } & AnimalInseminationDetailsModel
  },
  void
>
