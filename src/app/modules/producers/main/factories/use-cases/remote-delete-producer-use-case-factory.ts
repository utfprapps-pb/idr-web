import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteProducerUseCase } from '../../../data/use-cases'

import type { DeleteProducerUseCase } from '../../../domain/use-cases'

export function makeRemoteDeleteProducerUseCase(): DeleteProducerUseCase {
  return new RemoteDeleteProducerUseCase('v1/producers', makeApiHttpClient())
}
