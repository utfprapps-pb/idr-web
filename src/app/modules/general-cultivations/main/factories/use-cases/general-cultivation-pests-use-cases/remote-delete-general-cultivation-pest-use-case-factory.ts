import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteGeneralCultivationPestUseCase } from '../../../../data/use-cases/general-cultivation-pests-use-cases'

import type { DeleteGeneralCultivationPestUseCase } from '../../../../domain/use-cases/general-cultivation-pests-use-cases'

export function makeRemoteDeleteGeneralCultivationPestUseCase(): DeleteGeneralCultivationPestUseCase {
  return new RemoteDeleteGeneralCultivationPestUseCase(
    'general-cultivations/pests',
    makeApiHttpClient()
  )
}
