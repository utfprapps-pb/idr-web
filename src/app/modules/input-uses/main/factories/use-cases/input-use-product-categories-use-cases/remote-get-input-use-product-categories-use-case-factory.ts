import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetInputUseProductCategoriesUseCase } from '../../../../data/use-cases/input-use-product-categories-use-cases'

import type { GetInputUseProductCategoriesUseCase } from '../../../../domain/use-cases/input-use-product-categories-use-cases'

export function makeRemoteGetInputUseProductCategoriesUseCase(): GetInputUseProductCategoriesUseCase {
  return new RemoteGetInputUseProductCategoriesUseCase(
    '/input-use-product-categories',
    makeApiHttpClient()
  )
}
