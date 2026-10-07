import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteRegionUseCase } from '../../../data/use-cases'

import type { DeleteRegionUseCase } from '../../../domain/use-cases'

export function makeRemoteDeleteRegionUseCase(): DeleteRegionUseCase {
  return new RemoteDeleteRegionUseCase('v1/regions', makeApiHttpClient())
}
