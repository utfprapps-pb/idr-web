import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetInputUseLocationsUseCase } from '../../../../data/use-cases/input-use-locations-use-cases'

import type { GetInputUseLocationsUseCase } from '../../../../domain/use-cases/input-use-locations-use-cases'

export function makeRemoteGetInputUseLocationsUseCase(): GetInputUseLocationsUseCase {
  return new RemoteGetInputUseLocationsUseCase(
    '/input-uses/locations',
    makeApiHttpClient()
  )
}
