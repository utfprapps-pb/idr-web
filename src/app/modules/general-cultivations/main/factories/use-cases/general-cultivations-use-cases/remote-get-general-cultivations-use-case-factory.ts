import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetGeneralCultivationsUseCase } from '../../../../data/use-cases/general-cultivations-use-cases'

import type {
  GeneralCultivationApiResponse,
  GeneralCultivationModel,
} from '../../../../domain/models/general-cultivations-model'
import type { GetGeneralCultivationsUseCase } from '../../../../domain/use-cases/general-cultivations-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetGeneralCultivationsUseCase(): GetGeneralCultivationsUseCase {
  return new RemoteGetGeneralCultivationsUseCase(
    'general-cultivations',
    makeApiHttpClient<
      GeneralCultivationModel,
      GeneralCultivationApiResponse,
      ListApiResponse<GeneralCultivationApiResponse[]>
    >()
  )
}
