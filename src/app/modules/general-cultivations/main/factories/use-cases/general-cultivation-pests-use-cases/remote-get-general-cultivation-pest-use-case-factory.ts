import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetGeneralCultivationPestUseCase } from '../../../../data/use-cases/general-cultivation-pests-use-cases'

import type {
  GeneralCultivationPestDetailsModel,
  GeneralCultivationPestDetailsApiResponse,
} from '../../../../domain/models/general-cultivation-pests-model'
import type { GetGeneralCultivationPestUseCase } from '../../../../domain/use-cases/general-cultivation-pests-use-cases'

export function makeRemoteGetGeneralCultivationPestUseCase(): GetGeneralCultivationPestUseCase {
  return new RemoteGetGeneralCultivationPestUseCase(
    'general-cultivations/pests',
    makeApiHttpClient<
      GeneralCultivationPestDetailsModel,
      GeneralCultivationPestDetailsApiResponse
    >()
  )
}
