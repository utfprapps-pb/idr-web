import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetImprovementUseCase } from '../../../data/use-cases'

import type { ImprovementDetailsModel } from '../../../domain/models/improvements-model'
import type { GetImprovementUseCase } from '../../../domain/use-cases'

export function makeRemoteGetImprovementUseCase(): GetImprovementUseCase {
  return new RemoteGetImprovementUseCase(
    'properties/:propertyId/improvements',
    makeApiHttpClient<ImprovementDetailsModel>()
  )
}
