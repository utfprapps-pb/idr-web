import { RemoteGetAllBreedsUseCase } from '@/core/data/use-cases/breeds-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { GetAllBreedsUseCase } from '@/core/domain/use-cases/breeds-use-cases'
import { BreedModel } from '@/core/domain/models/breed-model'

export function makeRemoteGetAllBreedsUseCase(): GetAllBreedsUseCase {
  return new RemoteGetAllBreedsUseCase(
    'breeds',
    makeApiHttpClient<BreedModel, BreedModel>()
  )
}
