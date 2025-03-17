import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateImprovementUseCase } from '../../../data/use-cases'

import type { UpdateImprovementUseCase } from '../../../domain/use-cases'

export function makeRemoteUpdateImprovementUseCase(): UpdateImprovementUseCase {
  return new RemoteUpdateImprovementUseCase(
    'properties/:propertyId/improvements',
    makeApiHttpClient<void>()
  )
}
