import { RemoteGetAllProductsUseCase } from '@/core/data/use-cases/products-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type {
  ProductApiResponse,
  ProductModel,
} from '@/core/domain/models/products-model'
import type { ListApiResponse } from '@/core/domain/types'
import type { GetAllProductsUseCase } from '@/core/domain/use-cases/products-use-cases'

export function makeRemoteGetAllProductsUseCase(): GetAllProductsUseCase {
  return new RemoteGetAllProductsUseCase(
    'products',
    makeApiHttpClient<
      ProductModel,
      ProductApiResponse,
      ListApiResponse<ProductApiResponse[]>
    >()
  )
}
