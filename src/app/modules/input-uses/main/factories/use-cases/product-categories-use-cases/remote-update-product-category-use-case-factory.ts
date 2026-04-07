import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateProductCategoryUseCase } from '../../../../data/use-cases/product-categories-use-cases'

import type { UpdateProductCategoryUseCase } from '../../../../domain/use-cases/product-categories-use-cases'

export function makeRemoteUpdateProductCategoryUseCase(): UpdateProductCategoryUseCase {
  return new RemoteUpdateProductCategoryUseCase(
    '/product-categories',
    makeApiHttpClient()
  )
}
