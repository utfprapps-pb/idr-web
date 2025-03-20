import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalChildBirthsUseCase } from '../../../../data/use-cases/childbirths-use-cases'

import type { AnimalChildBirthModel } from '../../../../domain/models/animal-childbirths-model'
import type { GetAnimalChildBirthsUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'

export function makeRemoteGetAnimalChildBirthsUseCase(): GetAnimalChildBirthsUseCase {
  return new RemoteGetAnimalChildBirthsUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<AnimalChildBirthModel[]>()
  )
}
