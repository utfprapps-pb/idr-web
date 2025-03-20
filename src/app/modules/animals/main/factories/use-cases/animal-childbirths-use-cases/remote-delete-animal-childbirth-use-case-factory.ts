import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalChildbirthUseCase } from '../../../../data/use-cases/childbirths-use-cases'

import type { DeleteAnimalChildbirthUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'

export function makeRemoteDeleteAnimalChildbirthUseCase(): DeleteAnimalChildbirthUseCase {
  return new RemoteDeleteAnimalChildbirthUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<void>()
  )
}
