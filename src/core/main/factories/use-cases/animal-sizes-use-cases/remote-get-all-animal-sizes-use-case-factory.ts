import { RemoteGetAllAnimalSizesUseCase } from '@/core/data/use-cases/animal-sizes-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type {
  AnimalSizeApiResponse,
  AnimalSizeModel,
} from '@/core/domain/models/animal-sizes-model'
import type { SearchApiResponse } from '@/core/domain/types'
import type { GetAllAnimalSizesUseCase } from '@/core/domain/use-cases/animal-sizes-use-cases'

export function makeRemoteGetAllAnimalSizesUseCase(): GetAllAnimalSizesUseCase {
  return new RemoteGetAllAnimalSizesUseCase(
    'animal-sizes',
    makeApiHttpClient<
      AnimalSizeModel,
      AnimalSizeApiResponse,
      SearchApiResponse<AnimalSizeApiResponse>
    >()
  )
}
