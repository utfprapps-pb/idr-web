import { RemoteSearchCitiesUseCase } from '@/core/data/use-cases/city-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { CitySearchApiResponse } from '@/core/domain/models/city-model'
import type { SearchCitiesUseCase } from '@/core/domain/use-cases/city-use-cases'

export function makeRemoteSearchCitiesUseCase(): SearchCitiesUseCase {
  return new RemoteSearchCitiesUseCase(
    '/v1/cities',
    makeApiHttpClient<unknown, unknown, CitySearchApiResponse>()
  )
}
