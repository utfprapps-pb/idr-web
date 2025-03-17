import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalChildBirthUseCase } from '../../../data/use-cases'

import type { CreateAnimalChildBirthUseCase } from '../../../domain/use-cases'

export function makeRemoteCreateAnimalChildBirthUseCase(): CreateAnimalChildBirthUseCase {
  return new RemoteCreateAnimalChildBirthUseCase(
    'properties/:propertyId/animals/:animalId/child-births',
    makeApiHttpClient<void>()
  )
}
