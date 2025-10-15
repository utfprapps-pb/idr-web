import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteVegetableDiseaseUseCase } from '../../../../data/use-cases/vegetable-diseases-use-cases'

import type { DeleteVegetableDiseaseUseCase } from '../../../../domain/use-cases/vegetable-diseases-use-cases'

export function makeRemoteDeleteVegetableDiseaseUseCase(): DeleteVegetableDiseaseUseCase {
  return new RemoteDeleteVegetableDiseaseUseCase(
    'properties/:propertyId/vegetables/diseases',
    makeApiHttpClient()
  )
}
