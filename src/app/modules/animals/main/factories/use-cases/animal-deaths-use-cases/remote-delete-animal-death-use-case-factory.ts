import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalDeathUseCase } from '../../../../data/use-cases/animal-deaths-use-cases'

import type { DeleteAnimalDeathUseCase } from '../../../../domain/use-cases/animal-deaths-use-cases'

export function makeRemoteDeleteAnimalDeathUseCase(): DeleteAnimalDeathUseCase {
  return new RemoteDeleteAnimalDeathUseCase(
    'properties/:propertyId/animals/:animalId/deaths',
    makeApiHttpClient()
  )
}
