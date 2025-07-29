import type { AnimalHeiferCalfStageAdditionalDataModel } from '../../models/animal-heifer-calf-stages-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalHeiferCalfStageAdditionalDataUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
  },
  AnimalHeiferCalfStageAdditionalDataModel
>
