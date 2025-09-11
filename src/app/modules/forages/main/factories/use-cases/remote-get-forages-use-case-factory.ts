import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetForagesUseCase } from '../../../data/use-cases'

import type {
  ForageApiResponse,
  ForageModel,
} from '../../../domain/models/forages-model'
import type { GetForagesUseCase } from '../../../domain/use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetForagesUseCase(): GetForagesUseCase {
  return new RemoteGetForagesUseCase(
    'properties/:propertyId/forages',
    makeApiHttpClient<
      ForageModel,
      ForageApiResponse,
      ListApiResponse<ForageApiResponse[]>
    >()
  )
}
