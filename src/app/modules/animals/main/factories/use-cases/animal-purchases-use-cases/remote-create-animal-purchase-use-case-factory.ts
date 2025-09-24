import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalPurchaseUseCase } from '../../../../data/use-cases/animal-purchases-use-cases'

import type { CreateAnimalPurchaseUseCase } from '../../../../domain/use-cases/animal-purchases-use-cases'

export function makeRemoteCreateAnimalPurchaseUseCase(): CreateAnimalPurchaseUseCase {
  return new RemoteCreateAnimalPurchaseUseCase(
    'properties/:propertyId/animals/:animalId/purchases',
    makeApiHttpClient()
  )
}
