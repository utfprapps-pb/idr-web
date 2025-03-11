import { RemoteGetAllBreedsUseCase } from '@/core/data/use-cases/breeds-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { Option } from '@/core/domain/types'
import type { GetAllBreedsUseCase } from '@/core/domain/use-cases/breeds-use-cases'

export function makeRemoteGetAllBreedsUseCase(): GetAllBreedsUseCase {
  return new RemoteGetAllBreedsUseCase(
    'breeds/all',
    makeApiHttpClient<Option[]>()
  )
}
