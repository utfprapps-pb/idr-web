import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetVegetableDiseasesUseCase } from '../../../../data/use-cases/vegetable-diseases-use-cases'

import type {
  VegetableDiseaseApiResponse,
  VegetableDiseaseModel,
} from '../../../../domain/models/vegetable-diseases-model'
import type { GetVegetableDiseasesUseCase } from '../../../../domain/use-cases/vegetable-diseases-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetVegetableDiseasesUseCase(): GetVegetableDiseasesUseCase {
  return new RemoteGetVegetableDiseasesUseCase(
    'properties/:propertyId/vegetables/diseases',
    makeApiHttpClient<
      VegetableDiseaseModel,
      VegetableDiseaseApiResponse,
      ListApiResponse<VegetableDiseaseApiResponse[]>
    >()
  )
}
