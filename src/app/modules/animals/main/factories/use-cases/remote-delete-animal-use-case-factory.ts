import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalUseCase } from '../../../data/use-cases'

import type { DeleteAnimalUseCase } from '../../../domain/use-cases'

export function makeRemoteDeleteAnimalUseCase(): DeleteAnimalUseCase {
  return new RemoteDeleteAnimalUseCase(
    'properties/:propertyId/animals',
    makeApiHttpClient<void>()
  )
}
