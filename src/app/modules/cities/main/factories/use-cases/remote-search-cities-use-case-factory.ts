import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteSearchCitiesUseCase } from '../../../data/use-cases'

import type { SearchCitiesUseCase } from '../../../domain/use-cases'

export function makeRemoteSearchCitiesUseCase(): SearchCitiesUseCase {
  return new RemoteSearchCitiesUseCase('v1/cities', makeApiHttpClient())
}
