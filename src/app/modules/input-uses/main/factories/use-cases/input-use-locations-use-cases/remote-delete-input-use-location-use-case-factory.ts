import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteInputUseLocationUseCase } from '../../../../data/use-cases/input-use-locations-use-cases'

import type { DeleteInputUseLocationUseCase } from '../../../../domain/use-cases/input-use-locations-use-cases'

export function makeRemoteDeleteInputUseLocationUseCase(): DeleteInputUseLocationUseCase {
  return new RemoteDeleteInputUseLocationUseCase(
    '/input-uses/locations',
    makeApiHttpClient()
  )
}
