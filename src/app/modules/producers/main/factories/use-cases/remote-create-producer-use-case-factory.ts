import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateProducerUseCase } from '../../../data/use-cases'

import type { CreateProducerUseCase } from '../../../domain/use-cases'

export function makeRemoteCreateProducerUseCase(): CreateProducerUseCase {
  return new RemoteCreateProducerUseCase('v1/producers', makeApiHttpClient())
}
