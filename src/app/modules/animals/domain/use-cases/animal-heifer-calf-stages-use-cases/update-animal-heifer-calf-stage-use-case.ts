import type { AnimalHeiferCalfStageDetailsModel } from '../../models/animal-heifer-calf-stages-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalHeiferCalfStageUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalHeiferCalfStage: WithId<AnimalHeiferCalfStageDetailsModel>
  },
  void
>
