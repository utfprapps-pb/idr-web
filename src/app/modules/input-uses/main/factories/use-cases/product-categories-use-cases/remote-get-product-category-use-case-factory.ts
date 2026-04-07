import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetProductCategoryUseCase } from '../../../../data/use-cases/product-categories-use-cases'

import type { GetProductCategoryUseCase } from '../../../../domain/use-cases/product-categories-use-cases'

export function makeRemoteGetProductCategoryUseCase(): GetProductCategoryUseCase {
  return new RemoteGetProductCategoryUseCase(
    '/product-categories',
    makeApiHttpClient()
  )
}
