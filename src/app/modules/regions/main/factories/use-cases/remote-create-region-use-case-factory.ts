import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateRegionUseCase } from '../../../data/use-cases'

import type { CreateRegionUseCase } from '../../../domain/use-cases'

export function makeRemoteCreateRegionUseCase(): CreateRegionUseCase {
  return new RemoteCreateRegionUseCase('v1/regions', makeApiHttpClient())
}
