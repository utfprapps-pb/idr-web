import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetCultivationDiseaseUseCase } from '../../../../data/use-cases/cultivation-diseases-use-cases'

import type {
  CultivationDiseaseDetailsModel,
  CultivationDiseaseDetailsApiResponse,
} from '../../../../domain/models/cultivation-diseases-model'
import type { GetCultivationDiseaseUseCase } from '../../../../domain/use-cases/cultivation-diseases-use-cases'

export function makeRemoteGetCultivationDiseaseUseCase(): GetCultivationDiseaseUseCase {
  return new RemoteGetCultivationDiseaseUseCase(
    'properties/:propertyId/cultivations/diseases',
    makeApiHttpClient<
      CultivationDiseaseDetailsModel,
      CultivationDiseaseDetailsApiResponse
    >()
  )
}
