import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateInputUseProductCategoryUseCase } from '../../../../data/use-cases/input-use-product-categories-use-cases'

import type { UpdateInputUseProductCategoryUseCase } from '../../../../domain/use-cases/input-use-product-categories-use-cases'

export function makeRemoteUpdateInputUseProductCategoryUseCase(): UpdateInputUseProductCategoryUseCase {
  return new RemoteUpdateInputUseProductCategoryUseCase(
    '/input-use-product-categories',
    makeApiHttpClient()
  )
}
