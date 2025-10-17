import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteGeneralCultivationUseCase } from '../../../../data/use-cases/general-cultivations-use-cases'

import type { DeleteGeneralCultivationUseCase } from '../../../../domain/use-cases/general-cultivations-use-cases'

export function makeRemoteDeleteGeneralCultivationUseCase(): DeleteGeneralCultivationUseCase {
  return new RemoteDeleteGeneralCultivationUseCase(
    'general-cultivations',
    makeApiHttpClient()
  )
}
