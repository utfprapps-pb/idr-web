import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalChildbirthUseCase } from '../../../../data/use-cases/animal-childbirths-use-cases'

import type { CreateAnimalChildbirthUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'

export function makeRemoteCreateAnimalChildbirthUseCase(): CreateAnimalChildbirthUseCase {
  return new RemoteCreateAnimalChildbirthUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<void>()
  )
}
