import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateCultivationPestUseCase } from '../../../../data/use-cases/cultivation-pests-use-cases'

import type { UpdateCultivationPestUseCase } from '../../../../domain/use-cases/cultivation-pests-use-cases'

export function makeRemoteUpdateCultivationPestUseCase(): UpdateCultivationPestUseCase {
  return new RemoteUpdateCultivationPestUseCase(
    'properties/:propertyId/cultivations/pests',
    makeApiHttpClient()
  )
}
