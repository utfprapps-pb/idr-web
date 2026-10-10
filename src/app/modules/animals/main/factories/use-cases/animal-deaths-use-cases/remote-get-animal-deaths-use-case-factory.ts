import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalDeathsUseCase } from '../../../../data/use-cases/animal-deaths-use-cases/remote-get-animal-deaths-use-case'

import type {
  AnimalDeathModel,
  AnimalDeathApiResponse,
} from '../../../../domain/models/animal-deaths-model'
import type { GetAnimalDeathsUseCase } from '../../../../domain/use-cases/animal-deaths-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalDeathsUseCase(): GetAnimalDeathsUseCase {
  return new RemoteGetAnimalDeathsUseCase(
    'properties/:propertyId/animals/:animalId/deaths',
    makeApiHttpClient<
      AnimalDeathModel,
      AnimalDeathApiResponse,
      SearchApiResponse<AnimalDeathApiResponse>
    >()
  )
}
