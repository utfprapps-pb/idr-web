import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalDeathUseCase } from '../../../../data/use-cases/animal-deaths-use-cases'

import type { CreateAnimalDeathUseCase } from '../../../../domain/use-cases/animal-deaths-use-cases'

export function makeRemoteCreateAnimalDeathUseCase(): CreateAnimalDeathUseCase {
  return new RemoteCreateAnimalDeathUseCase(
    'properties/:propertyId/animals/:animalId/deaths',
    makeApiHttpClient()
  )
}
