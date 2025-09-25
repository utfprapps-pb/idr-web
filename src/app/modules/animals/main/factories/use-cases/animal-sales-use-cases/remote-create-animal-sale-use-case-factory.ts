import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalSaleUseCase } from '../../../../data/use-cases/animal-sales-use-cases'

import type { CreateAnimalSaleUseCase } from '../../../../domain/use-cases/animal-sales-use-cases'

export function makeRemoteCreateAnimalSaleUseCase(): CreateAnimalSaleUseCase {
  return new RemoteCreateAnimalSaleUseCase(
    'properties/:propertyId/animals/:animalId/sales',
    makeApiHttpClient()
  )
}
