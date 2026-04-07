import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateInputUseLocationUseCase } from '../../../../data/use-cases/input-use-locations-use-cases'

import type { CreateInputUseLocationUseCase } from '../../../../domain/use-cases/input-use-locations-use-cases'

export function makeRemoteCreateInputUseLocationUseCase(): CreateInputUseLocationUseCase {
  return new RemoteCreateInputUseLocationUseCase(
    '/input-uses/locations',
    makeApiHttpClient()
  )
}
