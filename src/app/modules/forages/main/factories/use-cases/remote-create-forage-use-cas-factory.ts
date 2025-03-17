import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateForageUseCase } from '../../../data/use-cases'

import type { CreateForageUseCase } from '../../../domain/use-cases'

export function makeRemoteCreateForageUseCase(): CreateForageUseCase {
  return new RemoteCreateForageUseCase(
    'properties/:propertyId/forages',
    makeApiHttpClient<void>()
  )
}
