import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateGeneralCultivationDiseaseUseCase } from '../../../../data/use-cases/general-cultivation-diseases-use-cases'

import type { CreateGeneralCultivationDiseaseUseCase } from '../../../../domain/use-cases/general-cultivation-diseases-use-cases'

export function makeRemoteCreateGeneralCultivationDiseaseUseCase(): CreateGeneralCultivationDiseaseUseCase {
  return new RemoteCreateGeneralCultivationDiseaseUseCase(
    'general-cultivations/diseases',
    makeApiHttpClient()
  )
}
