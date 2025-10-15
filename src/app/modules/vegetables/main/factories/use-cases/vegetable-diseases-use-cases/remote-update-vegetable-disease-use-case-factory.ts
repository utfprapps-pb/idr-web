import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateVegetableDiseaseUseCase } from '../../../../data/use-cases/vegetable-diseases-use-cases'

import type { UpdateVegetableDiseaseUseCase } from '../../../../domain/use-cases/vegetable-diseases-use-cases'

export function makeRemoteUpdateVegetableDiseaseUseCase(): UpdateVegetableDiseaseUseCase {
  return new RemoteUpdateVegetableDiseaseUseCase(
    'properties/:propertyId/vegetables/diseases',
    makeApiHttpClient()
  )
}
