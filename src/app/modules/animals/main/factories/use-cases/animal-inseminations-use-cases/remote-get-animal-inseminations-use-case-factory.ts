import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalInseminationsUseCase } from '../../../../data/use-cases/animal-inseminations-use-cases'

import type {
  AnimalInseminationApiResponse,
  AnimalInseminationModel,
} from '../../../../domain/models/animal-inseminations-model'
import type { GetAnimalInseminationsUseCase } from '../../../../domain/use-cases/animal-inseminations-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalInseminationsUseCase(): GetAnimalInseminationsUseCase {
  return new RemoteGetAnimalInseminationsUseCase(
    'properties/:propertyId/animals/:animalId/inseminations',
    makeApiHttpClient<
      AnimalInseminationModel,
      AnimalInseminationApiResponse,
      ListApiResponse<AnimalInseminationModel[]>
    >()
  )
}
