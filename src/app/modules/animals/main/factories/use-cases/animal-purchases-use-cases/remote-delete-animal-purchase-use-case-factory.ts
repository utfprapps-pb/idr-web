import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalPurchaseUseCase } from '../../../../data/use-cases/animal-purchases-use-cases'

import type { DeleteAnimalPurchaseUseCase } from '../../../../domain/use-cases/animal-purchases-use-cases'

export function makeRemoteDeleteAnimalPurchaseUseCase(): DeleteAnimalPurchaseUseCase {
  return new RemoteDeleteAnimalPurchaseUseCase(
    'properties/:propertyId/animals/:animalId/purchases',
    makeApiHttpClient()
  )
}
