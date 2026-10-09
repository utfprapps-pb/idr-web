import { makeApiHttpClient } from '@/core/main/factories/http'

import {
  RemoteGetAnimalSalesUseCase,
  type AnimalSaleSearchApiItem,
  type AnimalSaleSearchApiResponse,
} from '../../../../data/use-cases/animal-sales-use-cases/remote-get-animal-sales-use-case'

import type { AnimalSaleModel } from '../../../../domain/models/animal-sales-model'
import type { GetAnimalSalesUseCase } from '../../../../domain/use-cases/animal-sales-use-cases'

export function makeRemoteGetAnimalSalesUseCase(): GetAnimalSalesUseCase {
  return new RemoteGetAnimalSalesUseCase(
    'properties/:propertyId/animals/:animalId/sales',
    makeApiHttpClient<
      AnimalSaleModel,
      AnimalSaleSearchApiItem,
      AnimalSaleSearchApiResponse
    >()
  )
}
