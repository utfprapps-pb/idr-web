import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetGeneralCultivationDiseaseUseCase } from '../../../../data/use-cases/general-cultivation-diseases-use-cases'

import type {
  GeneralCultivationDiseaseDetailsModel,
  GeneralCultivationDiseaseDetailsApiResponse,
} from '../../../../domain/models/general-cultivation-diseases-model'
import type { GetGeneralCultivationDiseaseUseCase } from '../../../../domain/use-cases/general-cultivation-diseases-use-cases'

export function makeRemoteGetGeneralCultivationDiseaseUseCase(): GetGeneralCultivationDiseaseUseCase {
  return new RemoteGetGeneralCultivationDiseaseUseCase(
    'general-cultivation/diseases',
    makeApiHttpClient<
      GeneralCultivationDiseaseDetailsModel,
      GeneralCultivationDiseaseDetailsApiResponse
    >()
  )
}
