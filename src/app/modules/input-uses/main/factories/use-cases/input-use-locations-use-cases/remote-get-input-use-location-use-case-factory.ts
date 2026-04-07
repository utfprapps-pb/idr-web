import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetInputUseLocationUseCase } from '../../../../data/use-cases/input-use-locations-use-cases'

import type { GetInputUseLocationUseCase } from '../../../../domain/use-cases/input-use-locations-use-cases'

export function makeRemoteGetInputUseLocationUseCase(): GetInputUseLocationUseCase {
  return new RemoteGetInputUseLocationUseCase(
    '/input-uses/locations',
    makeApiHttpClient()
  )
}
