import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteCultivationDiseaseUseCase } from '../../../../data/use-cases/cultivation-diseases-use-cases'

import type { DeleteCultivationDiseaseUseCase } from '../../../../domain/use-cases/cultivation-diseases-use-cases'

export function makeRemoteDeleteCultivationDiseaseUseCase(): DeleteCultivationDiseaseUseCase {
  return new RemoteDeleteCultivationDiseaseUseCase(
    'properties/:propertyId/cultivations/diseases',
    makeApiHttpClient()
  )
}
