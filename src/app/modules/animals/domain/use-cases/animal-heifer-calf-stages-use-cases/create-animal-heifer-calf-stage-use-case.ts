import type { AnimalHeiferCalfStageDetailsModel } from '../../models/animal-heifer-calf-stages-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalHeiferCalfStageUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalHeiferCalfStage: AnimalHeiferCalfStageDetailsModel
  },
  void
>
