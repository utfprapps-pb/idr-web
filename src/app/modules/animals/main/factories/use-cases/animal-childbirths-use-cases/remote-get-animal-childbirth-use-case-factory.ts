import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalChildbirthUseCase } from '../../../../data/use-cases/childbirths-use-cases'

import type { AnimalChildbirthDetailsModel } from '../../../../domain/models/animal-childbirths-model'
import type { GetAnimalChildbirthUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'

export function makeRemoteGetAnimalChildbirthUseCase(): GetAnimalChildbirthUseCase {
  return new RemoteGetAnimalChildbirthUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<AnimalChildbirthDetailsModel>()
  )
}
