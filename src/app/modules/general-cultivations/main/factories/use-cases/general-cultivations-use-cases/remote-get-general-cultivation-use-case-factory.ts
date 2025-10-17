import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetGeneralCultivationUseCase } from '../../../../data/use-cases/general-cultivations-use-cases'

import type {
  GeneralCultivationDetailsModel,
  GeneralCultivationDetailsApiResponse,
} from '../../../../domain/models/general-cultivations-model'
import type { GetGeneralCultivationUseCase } from '../../../../domain/use-cases/general-cultivations-use-cases'

export function makeRemoteGetGeneralCultivationUseCase(): GetGeneralCultivationUseCase {
  return new RemoteGetGeneralCultivationUseCase(
    'general-cultivations',
    makeApiHttpClient<
      GeneralCultivationDetailsModel,
      GeneralCultivationDetailsApiResponse
    >()
  )
}
