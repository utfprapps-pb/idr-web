import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateGeneralCultivationUseCase } from '../../../../data/use-cases/general-cultivations-use-cases'

import type { UpdateGeneralCultivationUseCase } from '../../../../domain/use-cases/general-cultivations-use-cases'

export function makeRemoteUpdateGeneralCultivationUseCase(): UpdateGeneralCultivationUseCase {
  return new RemoteUpdateGeneralCultivationUseCase(
    'general-cultivations',
    makeApiHttpClient()
  )
}
