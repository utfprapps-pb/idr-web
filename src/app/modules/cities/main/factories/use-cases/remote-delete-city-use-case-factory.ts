import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteCityUseCase } from '../../../data/use-cases'

import type { DeleteCityUseCase } from '../../../domain/use-cases'

export function makeRemoteDeleteCityUseCase(): DeleteCityUseCase {
  return new RemoteDeleteCityUseCase('v1/cities', makeApiHttpClient())
}
