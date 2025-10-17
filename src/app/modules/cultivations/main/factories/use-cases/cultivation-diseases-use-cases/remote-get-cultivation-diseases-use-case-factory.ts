import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetCultivationDiseasesUseCase } from '../../../../data/use-cases/cultivation-diseases-use-cases'

import type {
  CultivationDiseaseApiResponse,
  CultivationDiseaseModel,
} from '../../../../domain/models/cultivation-diseases-model'
import type { GetCultivationDiseasesUseCase } from '../../../../domain/use-cases/cultivation-diseases-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetCultivationDiseasesUseCase(): GetCultivationDiseasesUseCase {
  return new RemoteGetCultivationDiseasesUseCase(
    'properties/:propertyId/cultivations/diseases',
    makeApiHttpClient<
      CultivationDiseaseModel,
      CultivationDiseaseApiResponse,
      ListApiResponse<CultivationDiseaseApiResponse[]>
    >()
  )
}
