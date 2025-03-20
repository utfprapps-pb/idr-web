import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalChildBirthUseCase } from '../../../../data/use-cases/childbirths-use-cases'

import type { DeleteAnimalChildBirthUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'

export function makeRemoteDeleteAnimalChildBirthUseCase(): DeleteAnimalChildBirthUseCase {
  return new RemoteDeleteAnimalChildBirthUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<void>()
  )
}
