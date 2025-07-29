import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalChildbirthsUseCase } from '../../../../data/use-cases/animal-childbirths-use-cases'
import {
  type AnimalChildbirthApiResponse,
  type AnimalChildbirthModel,
} from '../../../../domain/models/animal-childbirths-model'

import type { GetAnimalChildbirthsUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalChildbirthsUseCase(): GetAnimalChildbirthsUseCase {
  return new RemoteGetAnimalChildbirthsUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<
      AnimalChildbirthModel,
      AnimalChildbirthApiResponse,
      ListApiResponse<AnimalChildbirthModel[]>
    >()
  )
}
