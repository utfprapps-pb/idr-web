import type { AnimalHeiferCalfStageDetailsModel } from '../../models/animal-heifer-calf-stages-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalHeiferCalfStageUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  AnimalHeiferCalfStageDetailsModel
>
