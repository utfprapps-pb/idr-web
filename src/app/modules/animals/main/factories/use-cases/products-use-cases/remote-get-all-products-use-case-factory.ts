import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAllProductsUseCase } from '../../../../data/use-cases/products-use-cases'

import type {
  ProductApiResponse,
  ProductModel,
} from '../../../../domain/models/products-model'
import type { GetAllProductsUseCase } from '../../../../domain/use-cases/products-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

export function makeRemoteGetAllProductsUseCase(): GetAllProductsUseCase {
  return new RemoteGetAllProductsUseCase(
    'products',
    makeApiHttpClient<
      ProductModel,
      ProductApiResponse,
      SearchApiResponse<ProductApiResponse>
    >()
  )
}
