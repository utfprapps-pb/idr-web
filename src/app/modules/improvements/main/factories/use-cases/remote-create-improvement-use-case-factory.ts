import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateImprovementUseCase } from '../../../data/use-cases'

import type { CreateImprovementUseCase } from '../../../domain/use-cases'

export function makeRemoteCreateImprovementUseCase(): CreateImprovementUseCase {
  return new RemoteCreateImprovementUseCase(
    'properties/:propertyId/improvements',
    makeApiHttpClient<void>()
  )
}
