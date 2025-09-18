import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalInseminationUseCase } from '../../../../data/use-cases/animal-inseminations-use-cases'

import type { UpdateAnimalInseminationUseCase } from '../../../../domain/use-cases/animal-inseminations-use-cases'

export function makeRemoteUpdateAnimalInseminationUseCase(): UpdateAnimalInseminationUseCase {
  return new RemoteUpdateAnimalInseminationUseCase(
    'properties/:propertyId/animals/:animalId/inseminations',
    makeApiHttpClient()
  )
}
