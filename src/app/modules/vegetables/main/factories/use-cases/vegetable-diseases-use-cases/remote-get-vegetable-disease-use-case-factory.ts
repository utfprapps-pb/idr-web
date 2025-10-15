import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetVegetableDiseaseUseCase } from '../../../../data/use-cases/vegetable-diseases-use-cases'

import type {
  VegetableDiseaseDetailsModel,
  VegetableDiseaseDetailsApiResponse,
} from '../../../../domain/models/vegetable-diseases-model'
import type { GetVegetableDiseaseUseCase } from '../../../../domain/use-cases/vegetable-diseases-use-cases'

export function makeRemoteGetVegetableDiseaseUseCase(): GetVegetableDiseaseUseCase {
  return new RemoteGetVegetableDiseaseUseCase(
    'properties/:propertyId/vegetables/diseases',
    makeApiHttpClient<
      VegetableDiseaseDetailsModel,
      VegetableDiseaseDetailsApiResponse
    >()
  )
}
