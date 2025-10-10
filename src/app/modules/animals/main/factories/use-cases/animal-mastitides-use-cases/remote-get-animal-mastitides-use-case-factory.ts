import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalMastitidesUseCase } from '../../../../data/use-cases/animal-mastitides-use-cases'
import {
  type AnimalMastitisApiResponse,
  type AnimalMastitisModel,
} from '../../../../domain/models/animal-mastitides-model'

import type { GetAnimalMastitidesUseCase } from '../../../../domain/use-cases/animal-mastitides-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalMastitidesUseCase(): GetAnimalMastitidesUseCase {
  return new RemoteGetAnimalMastitidesUseCase(
    'properties/:propertyId/animals/:animalId/mastitides',
    makeApiHttpClient<
      AnimalMastitisModel,
      AnimalMastitisApiResponse,
      ListApiResponse<AnimalMastitisModel[]>
    >()
  )
}
