import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalChildBirthUseCase } from '../../../../data/use-cases/childbirths-use-cases'

import type { UpdateAnimalChildBirthUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'

export function makeRemoteUpdateAnimalChildBirthUseCase(): UpdateAnimalChildBirthUseCase {
  return new RemoteUpdateAnimalChildBirthUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<void>()
  )
}
