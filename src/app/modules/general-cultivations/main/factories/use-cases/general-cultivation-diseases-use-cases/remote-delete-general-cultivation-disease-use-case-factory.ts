import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteGeneralCultivationDiseaseUseCase } from '../../../../data/use-cases/general-cultivation-diseases-use-cases'

import type { DeleteGeneralCultivationDiseaseUseCase } from '../../../../domain/use-cases/general-cultivation-diseases-use-cases'

export function makeRemoteDeleteGeneralCultivationDiseaseUseCase(): DeleteGeneralCultivationDiseaseUseCase {
  return new RemoteDeleteGeneralCultivationDiseaseUseCase(
    'general-cultivations/diseases',
    makeApiHttpClient()
  )
}
