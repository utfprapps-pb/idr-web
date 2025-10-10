import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalPurchasesUseCase } from '../../../../data/use-cases/animal-purchases-use-cases'

import type {
  AnimalPurchaseApiResponse,
  AnimalPurchaseModel,
} from '../../../../domain/models/animal-purchases-model'
import type { GetAnimalPurchasesUseCase } from '../../../../domain/use-cases/animal-purchases-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalPurchasesUseCase(): GetAnimalPurchasesUseCase {
  return new RemoteGetAnimalPurchasesUseCase(
    'properties/:propertyId/animals/:animalId/purchases',
    makeApiHttpClient<
      AnimalPurchaseModel,
      AnimalPurchaseApiResponse,
      ListApiResponse<AnimalPurchaseModel[]>
    >()
  )
}
