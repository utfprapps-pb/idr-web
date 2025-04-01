import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalHeiferCalfStageUseCase } from '../../../../data/use-cases/heifer-calf-stages-use-cases'

import type { CreateAnimalHeiferCalfStageUseCase } from '../../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export function makeRemoteCreateAnimalHeiferCalfStageUseCase(): CreateAnimalHeiferCalfStageUseCase {
  return new RemoteCreateAnimalHeiferCalfStageUseCase(
    'properties/:propertyId/animals/:animalId/heifer-calf-stages',
    makeApiHttpClient<void>()
  )
}
