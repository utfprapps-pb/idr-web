import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalHeiferCalfStageUseCase } from '../../../../data/use-cases/animal-heifer-calf-stages-use-cases'

import type { UpdateAnimalHeiferCalfStageUseCase } from '../../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export function makeRemoteUpdateAnimalHeiferCalfStageUseCase(): UpdateAnimalHeiferCalfStageUseCase {
  return new RemoteUpdateAnimalHeiferCalfStageUseCase(
    'properties/:propertyId/animals/:animalId/heifer-calf-stages',
    makeApiHttpClient<void>()
  )
}
