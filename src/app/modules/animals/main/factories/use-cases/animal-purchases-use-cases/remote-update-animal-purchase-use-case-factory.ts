import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalPurchaseUseCase } from '../../../../data/use-cases/animal-purchases-use-cases'

import type { UpdateAnimalPurchaseUseCase } from '../../../../domain/use-cases/animal-purchases-use-cases'

export function makeRemoteUpdateAnimalPurchaseUseCase(): UpdateAnimalPurchaseUseCase {
  return new RemoteUpdateAnimalPurchaseUseCase(
    'properties/:propertyId/animals/:animalId/purchases',
    makeApiHttpClient()
  )
}
