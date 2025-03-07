import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreatePropertyUseCase } from '../../../data/use-cases'

import type { CreatePropertyUseCase } from '../../../domain/use-cases'

export function makeRemoteCreatePropertyUseCase(): CreatePropertyUseCase {
  return new RemoteCreatePropertyUseCase(
    'properties',
    makeApiHttpClient<void>()
  )
}
