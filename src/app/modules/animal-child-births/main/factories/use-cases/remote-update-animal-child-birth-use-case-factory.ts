import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalChildBirthUseCase } from '../../../data/use-cases'

import type { UpdateAnimalChildBirthUseCase } from '../../../domain/use-cases'

export function makeRemoteUpdateAnimalChildBirthUseCase(): UpdateAnimalChildBirthUseCase {
  return new RemoteUpdateAnimalChildBirthUseCase(
    'properties/:propertyId/animals/:animalId/child-births/:id',
    makeApiHttpClient<void>()
  )
}
