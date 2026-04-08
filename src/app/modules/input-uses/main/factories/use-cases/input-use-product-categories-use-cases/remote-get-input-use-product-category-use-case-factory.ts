import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetInputUseProductCategoryUseCase } from '../../../../data/use-cases/input-use-product-categories-use-cases'

import type { GetInputUseProductCategoryUseCase } from '../../../../domain/use-cases/input-use-product-categories-use-cases'

export function makeRemoteGetInputUseProductCategoryUseCase(): GetInputUseProductCategoryUseCase {
  return new RemoteGetInputUseProductCategoryUseCase(
    '/input-use-product-categories',
    makeApiHttpClient()
  )
}
