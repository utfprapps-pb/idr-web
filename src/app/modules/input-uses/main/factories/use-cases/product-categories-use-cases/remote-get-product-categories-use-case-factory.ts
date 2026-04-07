import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetProductCategoriesUseCase } from '../../../../data/use-cases/product-categories-use-cases'

import type { GetProductCategoriesUseCase } from '../../../../domain/use-cases/product-categories-use-cases'

export function makeRemoteGetProductCategoriesUseCase(): GetProductCategoriesUseCase {
  return new RemoteGetProductCategoriesUseCase(
    '/product-categories',
    makeApiHttpClient()
  )
}
