import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateRegionUseCase } from '../../../data/use-cases'

import type { UpdateRegionUseCase } from '../../../domain/use-cases'

export function makeRemoteUpdateRegionUseCase(): UpdateRegionUseCase {
  return new RemoteUpdateRegionUseCase('v1/regions', makeApiHttpClient())
}
