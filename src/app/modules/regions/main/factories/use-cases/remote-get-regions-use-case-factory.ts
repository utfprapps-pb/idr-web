import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetRegionsUseCase } from '../../../data/use-cases'

import type { GetRegionsUseCase } from '../../../domain/use-cases'

export function makeRemoteGetRegionsUseCase(): GetRegionsUseCase {
  return new RemoteGetRegionsUseCase('v1/regions', makeApiHttpClient())
}
