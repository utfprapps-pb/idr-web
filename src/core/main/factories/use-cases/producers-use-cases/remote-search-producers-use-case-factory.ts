import { RemoteSearchProducersUseCase } from '@/core/data/use-cases/producers-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { SearchProducersUseCase } from '@/core/domain/use-cases/producers-use-cases'

export function makeRemoteSearchProducersUseCase(): SearchProducersUseCase {
  return new RemoteSearchProducersUseCase('/v1/producers', makeApiHttpClient())
}
