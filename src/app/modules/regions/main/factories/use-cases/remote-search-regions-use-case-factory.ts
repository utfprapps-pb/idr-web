import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteSearchRegionsUseCase } from '../../../data/use-cases'

import type { SearchRegionsUseCase } from '../../../domain/use-cases'

export function makeRemoteSearchRegionsUseCase(): SearchRegionsUseCase {
  return new RemoteSearchRegionsUseCase('v1/regions', makeApiHttpClient())
}
