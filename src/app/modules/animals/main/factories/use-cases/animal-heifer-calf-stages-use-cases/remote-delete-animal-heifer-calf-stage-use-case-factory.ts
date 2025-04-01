import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalHeiferCalfStageUseCase } from '../../../../data/use-cases/heifer-calf-stages-use-cases'

import type { DeleteAnimalHeiferCalfStageUseCase } from '../../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export function makeRemoteDeleteAnimalHeiferCalfStageUseCase(): DeleteAnimalHeiferCalfStageUseCase {
  return new RemoteDeleteAnimalHeiferCalfStageUseCase(
    'properties/:propertyId/animals/:animalId/heifer-calf-stages',
    makeApiHttpClient<void>()
  )
}
