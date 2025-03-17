import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalUseCase } from '../../../data/use-cases'

import type { CreateAnimalUseCase } from '../../../domain/use-cases'

export function makeRemoteCreateAnimalUseCase(): CreateAnimalUseCase {
  return new RemoteCreateAnimalUseCase(
    'properties/:propertyId/animals',
    makeApiHttpClient<void>()
  )
}
