import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateCityUseCase } from '../../../data/use-cases'

import type { CreateCityUseCase } from '../../../domain/use-cases'

export function makeRemoteCreateCityUseCase(): CreateCityUseCase {
  return new RemoteCreateCityUseCase('v1/cities', makeApiHttpClient())
}
