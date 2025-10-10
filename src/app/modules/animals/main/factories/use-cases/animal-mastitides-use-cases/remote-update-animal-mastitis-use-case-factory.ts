import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalMastitisUseCase } from '../../../../data/use-cases/animal-mastitides-use-cases'

import type { UpdateAnimalMastitisUseCase } from '../../../../domain/use-cases/animal-mastitides-use-cases'

export function makeRemoteUpdateAnimalMastitisUseCase(): UpdateAnimalMastitisUseCase {
  return new RemoteUpdateAnimalMastitisUseCase(
    'properties/:propertyId/animals/:animalId/mastitides',
    makeApiHttpClient()
  )
}
