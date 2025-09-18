import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalInseminationUseCase } from '../../../../data/use-cases/animal-inseminations-use-cases'

import type {
  AnimalInseminationDetailsModel,
  AnimalInseminationDetailsApiResponse,
} from '../../../../domain/models/animal-inseminations-model'
import type { GetAnimalInseminationUseCase } from '../../../../domain/use-cases/animal-inseminations-use-cases'

export function makeRemoteGetAnimalInseminationUseCase(): GetAnimalInseminationUseCase {
  return new RemoteGetAnimalInseminationUseCase(
    'properties/:propertyId/animals/:animalId/inseminations',
    makeApiHttpClient<
      AnimalInseminationDetailsModel,
      AnimalInseminationDetailsApiResponse
    >()
  )
}
