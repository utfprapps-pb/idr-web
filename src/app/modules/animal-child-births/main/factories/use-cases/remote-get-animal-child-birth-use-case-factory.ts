import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalChildBirthUseCase } from '../../../data/use-cases'

import type { AnimalChildBirthDetailsModel } from '../../../domain/models/animal-child-births-model'
import type { GetAnimalChildBirthUseCase } from '../../../domain/use-cases'

export function makeRemoteGetAnimalChildBirthUseCase(): GetAnimalChildBirthUseCase {
  return new RemoteGetAnimalChildBirthUseCase(
    'properties/:propertyId/animals/:animalId/child-births/:id',
    makeApiHttpClient<AnimalChildBirthDetailsModel>()
  )
}
