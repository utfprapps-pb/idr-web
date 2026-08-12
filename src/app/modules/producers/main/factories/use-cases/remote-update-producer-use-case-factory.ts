import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateProducerUseCase } from '../../../data/use-cases'

import type { UpdateProducerUseCase } from '../../../domain/use-cases'

export function makeRemoteUpdateProducerUseCase(): UpdateProducerUseCase {
  return new RemoteUpdateProducerUseCase('v1/producers', makeApiHttpClient())
}
