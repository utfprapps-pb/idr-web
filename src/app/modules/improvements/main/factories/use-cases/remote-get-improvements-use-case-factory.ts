import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetImprovementsUseCase } from '../../../data/use-cases'

import type { ImprovementModel } from '../../../domain/models/improvements-model'
import type { GetImprovementsUseCase } from '../../../domain/use-cases'

export function makeRemoteGetImprovementsUseCase(): GetImprovementsUseCase {
  return new RemoteGetImprovementsUseCase(
    'properties/:propertyId/improvements',
    makeApiHttpClient<ImprovementModel[]>()
  )
}
