import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalUseCase } from '../../../data/use-cases'

import type { UpdateAnimalUseCase } from '../../../domain/use-cases'

export function makeRemoteUpdateAnimalUseCase(): UpdateAnimalUseCase {
  return new RemoteUpdateAnimalUseCase(
    'properties/:propertyId/animals',
    makeApiHttpClient<void>()
  )
}
