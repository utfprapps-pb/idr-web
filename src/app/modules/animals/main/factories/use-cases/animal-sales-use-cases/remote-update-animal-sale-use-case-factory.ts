import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalSaleUseCase } from '../../../../data/use-cases/animal-sales-use-cases'

import type { UpdateAnimalSaleUseCase } from '../../../../domain/use-cases/animal-sales-use-cases'

export function makeRemoteUpdateAnimalSaleUseCase(): UpdateAnimalSaleUseCase {
  return new RemoteUpdateAnimalSaleUseCase(
    'properties/:propertyId/animals/:animalId/sales',
    makeApiHttpClient()
  )
}
