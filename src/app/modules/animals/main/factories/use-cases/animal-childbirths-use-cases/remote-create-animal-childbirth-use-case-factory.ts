import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalChildBirthUseCase } from '../../../../data/use-cases/childbirths-use-cases'

import type { CreateAnimalChildBirthUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'

export function makeRemoteCreateAnimalChildBirthUseCase(): CreateAnimalChildBirthUseCase {
  return new RemoteCreateAnimalChildBirthUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<void>()
  )
}
