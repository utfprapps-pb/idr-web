import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetInputUseProductUseCase } from '../../../../data/use-cases/input-use-products-use-cases'

import type { GetInputUseProductUseCase } from '../../../../domain/use-cases/input-use-products-use-cases'

export function makeRemoteGetInputUseProductUseCase(): GetInputUseProductUseCase {
  return new RemoteGetInputUseProductUseCase(
    '/input-uses/products',
    makeApiHttpClient()
  )
}
