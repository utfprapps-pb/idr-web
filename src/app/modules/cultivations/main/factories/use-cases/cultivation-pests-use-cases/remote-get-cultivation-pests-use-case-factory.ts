import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetCultivationPestsUseCase } from '../../../../data/use-cases/cultivation-pests-use-cases'

import type {
  CultivationPestApiResponse,
  CultivationPestModel,
} from '../../../../domain/models/cultivation-pests-model'
import type { GetCultivationPestsUseCase } from '../../../../domain/use-cases/cultivation-pests-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetCultivationPestsUseCase(): GetCultivationPestsUseCase {
  return new RemoteGetCultivationPestsUseCase(
    'properties/:propertyId/cultivations/pests',
    makeApiHttpClient<
      CultivationPestModel,
      CultivationPestApiResponse,
      ListApiResponse<CultivationPestApiResponse[]>
    >()
  )
}
