import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalHeiferCalfStagesUseCase } from '../../../../data/use-cases/animal-heifer-calf-stages-use-cases'
import {
  AnimalHeiferCalfStageApiResponse,
  type AnimalHeiferCalfStageModel,
} from '../../../../domain/models/animal-heifer-calf-stages-model'

import type { GetAnimalHeiferCalfStagesUseCase } from '../../../../domain/use-cases/animal-heifer-calf-stages-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalHeiferCalfStagesUseCase(): GetAnimalHeiferCalfStagesUseCase {
  return new RemoteGetAnimalHeiferCalfStagesUseCase(
    'properties/:propertyId/animals/:animalId/heifer-calf-stages',
    makeApiHttpClient<
      AnimalHeiferCalfStageModel,
      AnimalHeiferCalfStageApiResponse,
      ListApiResponse<AnimalHeiferCalfStageModel[]>
    >()
  )
}
