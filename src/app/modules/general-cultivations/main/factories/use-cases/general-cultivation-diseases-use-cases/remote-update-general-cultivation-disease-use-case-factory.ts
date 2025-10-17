import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateGeneralCultivationDiseaseUseCase } from '../../../../data/use-cases/general-cultivation-diseases-use-cases'

import type { UpdateGeneralCultivationDiseaseUseCase } from '../../../../domain/use-cases/general-cultivation-diseases-use-cases'

export function makeRemoteUpdateGeneralCultivationDiseaseUseCase(): UpdateGeneralCultivationDiseaseUseCase {
  return new RemoteUpdateGeneralCultivationDiseaseUseCase(
    'general-cultivations/diseases',
    makeApiHttpClient()
  )
}
