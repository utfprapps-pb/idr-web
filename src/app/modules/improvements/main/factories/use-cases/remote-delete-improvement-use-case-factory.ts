import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteImprovementUseCase } from '../../../data/use-cases'

import type { DeleteImprovementUseCase } from '../../../domain/use-cases'

export function makeRemoteDeleteImprovementUseCase(): DeleteImprovementUseCase {
  return new RemoteDeleteImprovementUseCase(
    'properties/:propertyId/improvements',
    makeApiHttpClient<void>()
  )
}
