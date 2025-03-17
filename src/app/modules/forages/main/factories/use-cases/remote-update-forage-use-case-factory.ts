import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateForageUseCase } from '../../../data/use-cases'

import type { UpdateForageUseCase } from '../../../domain/use-cases'

export function makeRemoteUpdateForageUseCase(): UpdateForageUseCase {
  return new RemoteUpdateForageUseCase(
    'properties/:propertyId/forages',
    makeApiHttpClient<void>()
  )
}
