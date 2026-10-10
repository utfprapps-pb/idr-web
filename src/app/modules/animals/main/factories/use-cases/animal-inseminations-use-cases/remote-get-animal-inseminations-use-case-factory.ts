import { makeApiHttpClient } from '@/core/main/factories/http'

import {
  RemoteGetAnimalInseminationsUseCase,
  type AnimalInseminationSearchApiItem,
} from '../../../../data/use-cases/animal-inseminations-use-cases/remote-get-animal-inseminations-use-case'

import type { AnimalInseminationModel } from '../../../../domain/models/animal-inseminations-model'
import type { GetAnimalInseminationsUseCase } from '../../../../domain/use-cases/animal-inseminations-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalInseminationsUseCase(): GetAnimalInseminationsUseCase {
  return new RemoteGetAnimalInseminationsUseCase(
    'properties/:propertyId/animals/:animalId/inseminations',
    makeApiHttpClient<
      AnimalInseminationModel,
      AnimalInseminationSearchApiItem,
      SearchApiResponse<AnimalInseminationSearchApiItem>
    >()
  )
}
