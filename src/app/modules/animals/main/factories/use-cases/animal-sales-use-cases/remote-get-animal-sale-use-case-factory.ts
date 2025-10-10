import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalSaleUseCase } from '../../../../data/use-cases/animal-sales-use-cases'

import type {
  AnimalSaleDetailsModel,
  AnimalSaleDetailsApiResponse,
} from '../../../../domain/models/animal-sales-model'
import type { GetAnimalSaleUseCase } from '../../../../domain/use-cases/animal-sales-use-cases'

export function makeRemoteGetAnimalSaleUseCase(): GetAnimalSaleUseCase {
  return new RemoteGetAnimalSaleUseCase(
    'properties/:propertyId/animals/:animalId/sales',
    makeApiHttpClient<AnimalSaleDetailsModel, AnimalSaleDetailsApiResponse>()
  )
}
