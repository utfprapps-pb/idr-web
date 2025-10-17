import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateGeneralCultivationPestUseCase } from '../../../../data/use-cases/general-cultivation-pests-use-cases'

import type { CreateGeneralCultivationPestUseCase } from '../../../../domain/use-cases/general-cultivation-pests-use-cases'

export function makeRemoteCreateGeneralCultivationPestUseCase(): CreateGeneralCultivationPestUseCase {
  return new RemoteCreateGeneralCultivationPestUseCase(
    'general-cultivations/pests',
    makeApiHttpClient()
  )
}
