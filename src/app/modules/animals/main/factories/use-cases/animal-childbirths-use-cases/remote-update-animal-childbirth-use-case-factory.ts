import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalChildbirthUseCase } from '../../../../data/use-cases/animal-childbirths-use-cases'

import type { UpdateAnimalChildbirthUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'

export function makeRemoteUpdateAnimalChildbirthUseCase(): UpdateAnimalChildbirthUseCase {
  return new RemoteUpdateAnimalChildbirthUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<void>()
  )
}
