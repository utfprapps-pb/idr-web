import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalMastitisUseCase } from '../../../../data/use-cases/animal-mastitides-use-cases'

import type { CreateAnimalMastitisUseCase } from '../../../../domain/use-cases/animal-mastitides-use-cases'

export function makeRemoteCreateAnimalMastitisUseCase(): CreateAnimalMastitisUseCase {
  return new RemoteCreateAnimalMastitisUseCase(
    'properties/:propertyId/animals/:animalId/mastitides',
    makeApiHttpClient()
  )
}
