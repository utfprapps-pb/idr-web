import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalChildbirthsUseCase } from '../../../../data/use-cases/animal-childbirths-use-cases/remote-get-animal-childbirths-use-case'

import type {
  AnimalChildbirthModel,
  AnimalChildbirthApiResponse,
} from '../../../../domain/models/animal-childbirths-model'
import type { GetAnimalChildbirthsUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalChildbirthsUseCase(): GetAnimalChildbirthsUseCase {
  return new RemoteGetAnimalChildbirthsUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<
      AnimalChildbirthModel,
      AnimalChildbirthApiResponse,
      SearchApiResponse<AnimalChildbirthApiResponse>
    >()
  )
}
