import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateVegetableDiseaseUseCase } from '../../../../data/use-cases/vegetable-diseases-use-cases'

import type { CreateVegetableDiseaseUseCase } from '../../../../domain/use-cases/vegetable-diseases-use-cases'

export function makeRemoteCreateVegetableDiseaseUseCase(): CreateVegetableDiseaseUseCase {
  return new RemoteCreateVegetableDiseaseUseCase(
    'properties/:propertyId/vegetables/diseases',
    makeApiHttpClient()
  )
}
