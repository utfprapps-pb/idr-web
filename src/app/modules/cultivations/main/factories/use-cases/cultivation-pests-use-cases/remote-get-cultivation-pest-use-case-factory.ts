import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetCultivationPestUseCase } from '../../../../data/use-cases/cultivation-pests-use-cases'

import type {
  CultivationPestDetailsModel,
  CultivationPestDetailsApiResponse,
} from '../../../../domain/models/cultivation-pests-model'
import type { GetCultivationPestUseCase } from '../../../../domain/use-cases/cultivation-pests-use-cases'

export function makeRemoteGetCultivationPestUseCase(): GetCultivationPestUseCase {
  return new RemoteGetCultivationPestUseCase(
    'properties/:propertyId/cultivations/pests',
    makeApiHttpClient<
      CultivationPestDetailsModel,
      CultivationPestDetailsApiResponse
    >()
  )
}
