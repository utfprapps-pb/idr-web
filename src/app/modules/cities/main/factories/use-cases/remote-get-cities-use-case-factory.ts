import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetCitiesUseCase } from '../../../data/use-cases'

import type { GetCitiesUseCase } from '../../../domain/use-cases'

export function makeRemoteGetCitiesUseCase(): GetCitiesUseCase {
  return new RemoteGetCitiesUseCase('v1/cities', makeApiHttpClient())
}
