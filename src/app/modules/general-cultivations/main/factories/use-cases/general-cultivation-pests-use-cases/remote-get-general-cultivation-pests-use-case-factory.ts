import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetGeneralCultivationPestsUseCase } from '../../../../data/use-cases/general-cultivation-pests-use-cases'

import type {
  GeneralCultivationPestApiResponse,
  GeneralCultivationPestModel,
} from '../../../../domain/models/general-cultivation-pests-model'
import type { GetGeneralCultivationPestsUseCase } from '../../../../domain/use-cases/general-cultivation-pests-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetGeneralCultivationPestsUseCase(): GetGeneralCultivationPestsUseCase {
  return new RemoteGetGeneralCultivationPestsUseCase(
    'general-cultivations/pests',
    makeApiHttpClient<
      GeneralCultivationPestModel,
      GeneralCultivationPestApiResponse,
      ListApiResponse<GeneralCultivationPestApiResponse[]>
    >()
  )
}
