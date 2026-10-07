import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetPropertiesUseCase } from '../../../data/use-cases'

import type { GetPropertiesUseCase } from '../../../domain/use-cases'

export function makeRemoteGetPropertiesUseCase(): GetPropertiesUseCase {
  return new RemoteGetPropertiesUseCase('v1/properties', makeApiHttpClient())
}
