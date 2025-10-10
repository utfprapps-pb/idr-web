import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalSaleUseCase } from '../../../../data/use-cases/animal-sales-use-cases'

import type { DeleteAnimalSaleUseCase } from '../../../../domain/use-cases/animal-sales-use-cases'

export function makeRemoteDeleteAnimalSaleUseCase(): DeleteAnimalSaleUseCase {
  return new RemoteDeleteAnimalSaleUseCase(
    'properties/:propertyId/animals/:animalId/sales',
    makeApiHttpClient()
  )
}
