import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateCultivationDiseaseUseCase } from '../../../../data/use-cases/cultivation-diseases-use-cases'

import type { UpdateCultivationDiseaseUseCase } from '../../../../domain/use-cases/cultivation-diseases-use-cases'

export function makeRemoteUpdateCultivationDiseaseUseCase(): UpdateCultivationDiseaseUseCase {
  return new RemoteUpdateCultivationDiseaseUseCase(
    'properties/:propertyId/cultivations/diseases',
    makeApiHttpClient()
  )
}
