import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalInseminationUseCase } from '../../../../data/use-cases/animal-inseminations-use-cases'

import type { CreateAnimalInseminationUseCase } from '../../../../domain/use-cases/animal-inseminations-use-cases'

export function makeRemoteCreateAnimalInseminationUseCase(): CreateAnimalInseminationUseCase {
  return new RemoteCreateAnimalInseminationUseCase(
    'properties/:propertyId/animals/:animalId/inseminations',
    makeApiHttpClient()
  )
}
