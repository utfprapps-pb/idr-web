import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateInputUseProductCategoryUseCase } from '../../../../data/use-cases/input-use-product-categories-use-cases'

import type { CreateInputUseProductCategoryUseCase } from '../../../../domain/use-cases/input-use-product-categories-use-cases'

export function makeRemoteCreateInputUseProductCategoryUseCase(): CreateInputUseProductCategoryUseCase {
  return new RemoteCreateInputUseProductCategoryUseCase(
    '/input-use-product-categories',
    makeApiHttpClient()
  )
}
