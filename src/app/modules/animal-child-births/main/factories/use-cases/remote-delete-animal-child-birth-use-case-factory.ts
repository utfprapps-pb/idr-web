import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalChildBirthUseCase } from '../../../data/use-cases'

import type { DeleteAnimalChildBirthUseCase } from '../../../domain/use-cases'

export function makeRemoteDeleteAnimalChildBirthUseCase(): DeleteAnimalChildBirthUseCase {
  return new RemoteDeleteAnimalChildBirthUseCase(
    'properties/:propertyId/animals/:animalId/child-births/:id',
    makeApiHttpClient<void>()
  )
}
