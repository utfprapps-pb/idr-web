import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalMastitisUseCase } from '../../../../data/use-cases/animal-mastitides-use-cases'

import type {
  AnimalMastitisApiResponse,
  AnimalMastitisDetailsModel,
} from '../../../../domain/models/animal-mastitides-model'
import type { GetAnimalMastitisUseCase } from '../../../../domain/use-cases/animal-mastitides-use-cases'

export function makeRemoteGetAnimalMastitisUseCase(): GetAnimalMastitisUseCase {
  return new RemoteGetAnimalMastitisUseCase(
    'properties/:propertyId/animals/:animalId/mastitides',
    makeApiHttpClient<AnimalMastitisDetailsModel, AnimalMastitisApiResponse>()
  )
}
