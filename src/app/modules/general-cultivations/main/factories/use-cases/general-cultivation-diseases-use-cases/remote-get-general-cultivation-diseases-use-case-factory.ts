import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetGeneralCultivationDiseasesUseCase } from '../../../../data/use-cases/general-cultivation-diseases-use-cases'

import type {
  GeneralCultivationDiseaseApiResponse,
  GeneralCultivationDiseaseModel,
} from '../../../../domain/models/general-cultivation-diseases-model'
import type { GetGeneralCultivationDiseasesUseCase } from '../../../../domain/use-cases/general-cultivation-diseases-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetGeneralCultivationDiseasesUseCase(): GetGeneralCultivationDiseasesUseCase {
  return new RemoteGetGeneralCultivationDiseasesUseCase(
    'general-cultivations/diseases',
    makeApiHttpClient<
      GeneralCultivationDiseaseModel,
      GeneralCultivationDiseaseApiResponse,
      ListApiResponse<GeneralCultivationDiseaseApiResponse[]>
    >()
  )
}
