import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateCultivationDiseaseUseCase } from '../../../../data/use-cases/cultivation-diseases-use-cases'

import type { CreateCultivationDiseaseUseCase } from '../../../../domain/use-cases/cultivation-diseases-use-cases'

export function makeRemoteCreateCultivationDiseaseUseCase(): CreateCultivationDiseaseUseCase {
  return new RemoteCreateCultivationDiseaseUseCase(
    'properties/:propertyId/cultivations/diseases',
    makeApiHttpClient()
  )
}
