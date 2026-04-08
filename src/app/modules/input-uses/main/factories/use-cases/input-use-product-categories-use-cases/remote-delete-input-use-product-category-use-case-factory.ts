import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteInputUseProductCategoryUseCase } from '../../../../data/use-cases/input-use-product-categories-use-cases'

import type { DeleteInputUseProductCategoryUseCase } from '../../../../domain/use-cases/input-use-product-categories-use-cases'

export function makeRemoteDeleteInputUseProductCategoryUseCase(): DeleteInputUseProductCategoryUseCase {
  return new RemoteDeleteInputUseProductCategoryUseCase(
    '/input-use-product-categories',
    makeApiHttpClient()
  )
}
