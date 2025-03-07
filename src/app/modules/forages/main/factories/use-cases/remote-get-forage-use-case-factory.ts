import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetForageUseCase } from '../../../data/use-cases'

import type { ForageDetailsModel } from '../../../domain/models/forages-model'
import type { GetForageUseCase } from '../../../domain/use-cases'

export function makeRemoteGetForageUseCase(): GetForageUseCase {
  return new RemoteGetForageUseCase(
    'properties/:propertyId/forages',
    makeApiHttpClient<ForageDetailsModel>()
  )
}
