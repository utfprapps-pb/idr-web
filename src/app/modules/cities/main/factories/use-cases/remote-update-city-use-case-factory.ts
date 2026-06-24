import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateCityUseCase } from '../../../data/use-cases'

import type { UpdateCityUseCase } from '../../../domain/use-cases'

export function makeRemoteUpdateCityUseCase(): UpdateCityUseCase {
  return new RemoteUpdateCityUseCase('v1/cities', makeApiHttpClient())
}
