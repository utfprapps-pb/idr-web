import { makeApiHttpClient } from '@/core/main/factories/http'

import {
  RemoteGetAnimalPurchasesUseCase,
  type AnimalPurchaseSearchApiItem,
} from '../../../../data/use-cases/animal-purchases-use-cases/remote-get-animal-purchases-use-case'

import type { AnimalPurchaseModel } from '../../../../domain/models/animal-purchases-model'
import type { GetAnimalPurchasesUseCase } from '../../../../domain/use-cases/animal-purchases-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalPurchasesUseCase(): GetAnimalPurchasesUseCase {
  return new RemoteGetAnimalPurchasesUseCase(
    'properties/:propertyId/animals/:animalId/purchases',
    makeApiHttpClient<
      AnimalPurchaseModel,
      AnimalPurchaseSearchApiItem,
      SearchApiResponse<AnimalPurchaseSearchApiItem>
    >()
  )
}
