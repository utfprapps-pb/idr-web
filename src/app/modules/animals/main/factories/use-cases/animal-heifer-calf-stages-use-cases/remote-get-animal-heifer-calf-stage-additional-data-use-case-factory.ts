import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalHeiferCalfStageAdditionalDataUseCase } from '../../../../data/use-cases/animal-heifer-calf-stages-use-cases'

import type { AnimalHeiferCalfStageDetailsModel } from '../../../../domain/models/animal-heifer-calf-stages-model'
import type { GetAnimalHeiferCalfStageAdditionalDataUseCase } from '../../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export function makeRemoteGetAnimalHeiferCalfStageAdditionalDataUseCase(): GetAnimalHeiferCalfStageAdditionalDataUseCase {
  return new RemoteGetAnimalHeiferCalfStageAdditionalDataUseCase(
    'properties/:propertyId/animals/:animalId/heifer-calf-stages/additional-data',
    makeApiHttpClient<AnimalHeiferCalfStageDetailsModel>()
  )
}
