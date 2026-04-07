import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateInputUseLocationUseCase } from '../../../../data/use-cases/input-use-locations-use-cases'

import type { UpdateInputUseLocationUseCase } from '../../../../domain/use-cases/input-use-locations-use-cases'

export function makeRemoteUpdateInputUseLocationUseCase(): UpdateInputUseLocationUseCase {
  return new RemoteUpdateInputUseLocationUseCase(
    '/input-uses/locations',
    makeApiHttpClient()
  )
}
