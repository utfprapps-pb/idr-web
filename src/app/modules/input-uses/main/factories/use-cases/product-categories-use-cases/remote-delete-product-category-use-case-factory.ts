import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteProductCategoryUseCase } from '../../../../data/use-cases/product-categories-use-cases'

import type { DeleteProductCategoryUseCase } from '../../../../domain/use-cases/product-categories-use-cases'

export function makeRemoteDeleteProductCategoryUseCase(): DeleteProductCategoryUseCase {
  return new RemoteDeleteProductCategoryUseCase(
    '/product-categories',
    makeApiHttpClient()
  )
}
