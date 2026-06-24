import { RemoteSearchRegionsUseCase } from '@/core/data/use-cases/region-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { RegionSearchApiResponse } from '@/core/domain/models/region-model'
import type { SearchRegionsUseCase } from '@/core/domain/use-cases/region-use-cases'

export function makeRemoteSearchRegionsUseCase(): SearchRegionsUseCase {
  return new RemoteSearchRegionsUseCase(
    '/v1/regions',
    makeApiHttpClient<unknown, unknown, RegionSearchApiResponse>()
  )
}
