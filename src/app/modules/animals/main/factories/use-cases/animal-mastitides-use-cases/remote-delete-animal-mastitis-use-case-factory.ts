import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalMastitisUseCase } from '../../../../data/use-cases/animal-mastitides-use-cases'

import type { DeleteAnimalMastitisUseCase } from '../../../../domain/use-cases/animal-mastitides-use-cases'

export function makeRemoteDeleteAnimalMastitisUseCase(): DeleteAnimalMastitisUseCase {
  return new RemoteDeleteAnimalMastitisUseCase(
    'properties/:propertyId/animals/:animalId/mastitides',
    makeApiHttpClient()
  )
}
