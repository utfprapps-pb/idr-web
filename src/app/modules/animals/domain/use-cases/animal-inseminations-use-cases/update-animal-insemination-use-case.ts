import type { AnimalInseminationDetailsModel } from '../../models/animal-inseminations-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalInseminationUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalInsemination: WithId<AnimalInseminationDetailsModel>
  },
  void
>
