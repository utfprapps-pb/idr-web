import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalChildBirthsUseCase } from '../../../data/use-cases'

import type { AnimalChildBirthModel } from '../../../domain/models/animal-child-births-model'
import type { GetAnimalChildBirthsUseCase } from '../../../domain/use-cases'

export function makeRemoteGetAnimalChildBirthsUseCase(): GetAnimalChildBirthsUseCase {
  return new RemoteGetAnimalChildBirthsUseCase(
    'properties/:propertyId/animals/:animalId/child-births',
    makeApiHttpClient<AnimalChildBirthModel[]>()
  )
}
