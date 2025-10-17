import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateGeneralCultivationUseCase } from '../../../../data/use-cases/general-cultivations-use-cases'

import type { CreateGeneralCultivationUseCase } from '../../../../domain/use-cases/general-cultivations-use-cases'

export function makeRemoteCreateGeneralCultivationUseCase(): CreateGeneralCultivationUseCase {
  return new RemoteCreateGeneralCultivationUseCase(
    'general-cultivations',
    makeApiHttpClient()
  )
}
