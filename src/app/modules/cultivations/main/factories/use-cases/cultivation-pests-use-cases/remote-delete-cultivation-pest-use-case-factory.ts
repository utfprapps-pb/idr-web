import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteCultivationPestUseCase } from '../../../../data/use-cases/cultivation-pests-use-cases'

import type { DeleteCultivationPestUseCase } from '../../../../domain/use-cases/cultivation-pests-use-cases'

export function makeRemoteDeleteCultivationPestUseCase(): DeleteCultivationPestUseCase {
  return new RemoteDeleteCultivationPestUseCase(
    'properties/:propertyId/cultivations/pests',
    makeApiHttpClient()
  )
}
