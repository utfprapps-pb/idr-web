import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteForageUseCase } from '../../../data/use-cases'

import type { DeleteForageUseCase } from '../../../domain/use-cases'

export function makeRemoteDeleteForageUseCase(): DeleteForageUseCase {
  return new RemoteDeleteForageUseCase(
    'properties/:propertyId/forages',
    makeApiHttpClient<void>()
  )
}
