import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalInseminationUseCase } from '../../../../data/use-cases/animal-inseminations-use-cases'

import type { DeleteAnimalInseminationUseCase } from '../../../../domain/use-cases/animal-inseminations-use-cases'

export function makeRemoteDeleteAnimalInseminationUseCase(): DeleteAnimalInseminationUseCase {
  return new RemoteDeleteAnimalInseminationUseCase(
    'properties/:propertyId/animals/:animalId/inseminations',
    makeApiHttpClient()
  )
}
