import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalSalesUseCase } from '../../../../data/use-cases/animal-sales-use-cases'

import type {
  AnimalSaleApiResponse,
  AnimalSaleModel,
} from '../../../../domain/models/animal-sales-model'
import type { GetAnimalSalesUseCase } from '../../../../domain/use-cases/animal-sales-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalSalesUseCase(): GetAnimalSalesUseCase {
  return new RemoteGetAnimalSalesUseCase(
    'properties/:propertyId/animals/:animalId/sales',
    makeApiHttpClient<
      AnimalSaleModel,
      AnimalSaleApiResponse,
      ListApiResponse<AnimalSaleModel[]>
    >()
  )
}
