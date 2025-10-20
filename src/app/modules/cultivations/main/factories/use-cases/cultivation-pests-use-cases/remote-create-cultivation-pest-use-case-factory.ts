import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateCultivationPestUseCase } from '../../../../data/use-cases/cultivation-pests-use-cases'

import type { CreateCultivationPestUseCase } from '../../../../domain/use-cases/cultivation-pests-use-cases'

export function makeRemoteCreateCultivationPestUseCase(): CreateCultivationPestUseCase {
  return new RemoteCreateCultivationPestUseCase(
    'properties/:propertyId/cultivations/pests',
    makeApiHttpClient()
  )
}
