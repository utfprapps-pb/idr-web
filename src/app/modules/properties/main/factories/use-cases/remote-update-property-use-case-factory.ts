import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdatePropertyUseCase } from '../../../data/use-cases'

import type { UpdatePropertyUseCase } from '../../../domain/use-cases'

export function makeRemoteUpdatePropertyUseCase(): UpdatePropertyUseCase {
  return new RemoteUpdatePropertyUseCase(
    'properties',
    makeApiHttpClient<void>()
  )
}
