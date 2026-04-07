import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateProductCategoryUseCase } from '../../../../data/use-cases/product-categories-use-cases'

import type { CreateProductCategoryUseCase } from '../../../../domain/use-cases/product-categories-use-cases'

export function makeRemoteCreateProductCategoryUseCase(): CreateProductCategoryUseCase {
  return new RemoteCreateProductCategoryUseCase(
    '/product-categories',
    makeApiHttpClient()
  )
}
