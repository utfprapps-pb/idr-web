import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalDeathUseCase } from '../../../../data/use-cases/animal-deaths-use-cases'

import type { UpdateAnimalDeathUseCase } from '../../../../domain/use-cases/animal-deaths-use-cases'

export function makeRemoteUpdateAnimalDeathUseCase(): UpdateAnimalDeathUseCase {
  return new RemoteUpdateAnimalDeathUseCase(
    'properties/:propertyId/animals/:animalId/deaths',
    makeApiHttpClient()
  )
}
