import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeletePropertyUseCase } from '../../../data/use-cases'

import type { DeletePropertyUseCase } from '../../../domain/use-cases'

export function makeRemoteDeletePropertyUseCase(): DeletePropertyUseCase {
  return new RemoteDeletePropertyUseCase(
    'properties',
    makeApiHttpClient<void>()
  )
}
