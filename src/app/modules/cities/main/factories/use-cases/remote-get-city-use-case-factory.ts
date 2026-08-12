import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetCityUseCase } from '../../../data/use-cases'

import type { GetCityUseCase } from '../../../domain/use-cases'

export function makeRemoteGetCityUseCase(): GetCityUseCase {
  return new RemoteGetCityUseCase('v1/cities', makeApiHttpClient())
}
