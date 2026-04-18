import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetInputUseProductsUseCase } from '../../../../data/use-cases/input-use-products-use-cases'

import type { GetInputUseProductsUseCase } from '../../../../domain/use-cases/input-use-products-use-cases'

export function makeRemoteGetInputUseProductsUseCase(): GetInputUseProductsUseCase {
  return new RemoteGetInputUseProductsUseCase(
    '/input-uses/products',
    makeApiHttpClient()
  )
}
