import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateGeneralCultivationPestUseCase } from '../../../../data/use-cases/general-cultivation-pests-use-cases'

import type { UpdateGeneralCultivationPestUseCase } from '../../../../domain/use-cases/general-cultivation-pests-use-cases'

export function makeRemoteUpdateGeneralCultivationPestUseCase(): UpdateGeneralCultivationPestUseCase {
  return new RemoteUpdateGeneralCultivationPestUseCase(
    'general-cultivations/pests',
    makeApiHttpClient()
  )
}
