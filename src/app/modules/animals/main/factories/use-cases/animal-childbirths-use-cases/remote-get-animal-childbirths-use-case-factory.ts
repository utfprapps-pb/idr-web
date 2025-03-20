import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalChildbirthsUseCase } from '../../../../data/use-cases/childbirths-use-cases'

import type { AnimalChildbirthModel } from '../../../../domain/models/animal-childbirths-model'
import type { GetAnimalChildbirthsUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'

export function makeRemoteGetAnimalChildbirthsUseCase(): GetAnimalChildbirthsUseCase {
  return new RemoteGetAnimalChildbirthsUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<AnimalChildbirthModel[]>()
  )
}
