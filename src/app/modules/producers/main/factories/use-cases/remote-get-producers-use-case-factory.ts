import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetProducersUseCase } from '../../../data/use-cases'

import type { GetProducersUseCase } from '../../../domain/use-cases'

export function makeRemoteGetProducersUseCase(): GetProducersUseCase {
  return new RemoteGetProducersUseCase('v1/producers', makeApiHttpClient())
}
