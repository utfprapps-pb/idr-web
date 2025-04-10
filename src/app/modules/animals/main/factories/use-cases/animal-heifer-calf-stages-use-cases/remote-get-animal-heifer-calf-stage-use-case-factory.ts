import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalHeiferCalfStageUseCase } from '../../../../data/use-cases/animal-heifer-calf-stages-use-cases'

import type { AnimalHeiferCalfStageDetailsModel } from '../../../../domain/models/animal-heifer-calf-stages-model'
import type { GetAnimalHeiferCalfStageUseCase } from '../../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export function makeRemoteGetAnimalHeiferCalfStageUseCase(): GetAnimalHeiferCalfStageUseCase {
  return new RemoteGetAnimalHeiferCalfStageUseCase(
    'properties/:propertyId/animals/:animalId/heifer-calf-stages',
    makeApiHttpClient<AnimalHeiferCalfStageDetailsModel>()
  )
}
