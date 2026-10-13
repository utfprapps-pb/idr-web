import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetProducerUseCase } from '../../../data/use-cases'

import type { GetProducerUseCase } from '../../../domain/use-cases'

export function makeRemoteGetProducerUseCase(): GetProducerUseCase {
  return new RemoteGetProducerUseCase('v1/producers', makeApiHttpClient())
}
