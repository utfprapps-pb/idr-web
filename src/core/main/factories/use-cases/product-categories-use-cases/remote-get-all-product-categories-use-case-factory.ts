import { RemoteGetAllProductCategoriesUseCase } from '@/core/data/use-cases/product-categories-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type {
  ProductCategoryApiResponse,
  ProductCategoryModel,
} from '@/core/domain/models/product-categories-model'
import type { ListApiResponse } from '@/core/domain/types'
import type { GetAllProductCategoriesUseCase } from '@/core/domain/use-cases/product-categories-use-cases'

export function makeRemoteGetAllProductCategoriesUseCase(): GetAllProductCategoriesUseCase {
  return new RemoteGetAllProductCategoriesUseCase(
    'product-categories',
    makeApiHttpClient<
      ProductCategoryModel,
      ProductCategoryApiResponse,
      ListApiResponse<ProductCategoryApiResponse[]>
    >()
  )
}
