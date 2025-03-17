import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetPropertyUseCase } from '../../../data/use-cases'

import type { PropertyDetailsModel } from '../../../domain/models/properties-model'
import type { GetPropertyUseCase } from '../../../domain/use-cases'

export function makeRemoteGetPropertyUseCase(): GetPropertyUseCase {
  return new RemoteGetPropertyUseCase(
    'properties',
    makeApiHttpClient<PropertyDetailsModel>()
  )
}
