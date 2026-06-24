import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetRegionUseCase } from '../../../data/use-cases'

import type { GetRegionUseCase } from '../../../domain/use-cases'

export function makeRemoteGetRegionUseCase(): GetRegionUseCase {
  return new RemoteGetRegionUseCase('v1/regions', makeApiHttpClient())
}
