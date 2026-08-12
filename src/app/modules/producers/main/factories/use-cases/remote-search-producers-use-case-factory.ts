import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteSearchProducersUseCase } from '../../../data/use-cases'

import type { SearchProducersUseCase } from '../../../domain/use-cases'

export function makeRemoteSearchProducersUseCase(): SearchProducersUseCase {
  return new RemoteSearchProducersUseCase('v1/producers', makeApiHttpClient())
}
