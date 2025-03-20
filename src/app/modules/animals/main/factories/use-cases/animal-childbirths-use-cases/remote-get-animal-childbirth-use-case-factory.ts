import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalChildBirthUseCase } from '../../../../data/use-cases/childbirths-use-cases'

import type { AnimalChildBirthDetailsModel } from '../../../../domain/models/animal-childbirths-model'
import type { GetAnimalChildBirthUseCase } from '../../../../domain/use-cases/animal-childbirths-use-cases'

export function makeRemoteGetAnimalChildBirthUseCase(): GetAnimalChildBirthUseCase {
  return new RemoteGetAnimalChildBirthUseCase(
    'properties/:propertyId/animals/:animalId/childbirths',
    makeApiHttpClient<AnimalChildBirthDetailsModel>()
  )
}
