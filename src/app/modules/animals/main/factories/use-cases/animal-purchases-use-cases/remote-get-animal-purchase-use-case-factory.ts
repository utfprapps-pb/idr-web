import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalPurchaseUseCase } from '../../../../data/use-cases/animal-purchases-use-cases'

import type {
  AnimalPurchaseDetailsModel,
  AnimalPurchaseDetailsApiResponse,
} from '../../../../domain/models/animal-purchases-model'
import type { GetAnimalPurchaseUseCase } from '../../../../domain/use-cases/animal-purchases-use-cases'

export function makeRemoteGetAnimalPurchaseUseCase(): GetAnimalPurchaseUseCase {
  return new RemoteGetAnimalPurchaseUseCase(
    'properties/:propertyId/animals/:animalId/purchases',
    makeApiHttpClient<
      AnimalPurchaseDetailsModel,
      AnimalPurchaseDetailsApiResponse
    >()
  )
}
