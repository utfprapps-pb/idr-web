import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalDeathUseCase } from '../../../../data/use-cases/animal-deaths-use-cases'

import type {
  AnimalDeathDetailsModel,
  AnimalDeathDetailsApiResponse,
} from '../../../../domain/models/animal-deaths-model'
import type { GetAnimalDeathUseCase } from '../../../../domain/use-cases/animal-deaths-use-cases'

export function makeRemoteGetAnimalDeathUseCase(): GetAnimalDeathUseCase {
  return new RemoteGetAnimalDeathUseCase(
    'properties/:propertyId/animals/:animalId/deaths',
    makeApiHttpClient<AnimalDeathDetailsModel, AnimalDeathDetailsApiResponse>()
  )
}
