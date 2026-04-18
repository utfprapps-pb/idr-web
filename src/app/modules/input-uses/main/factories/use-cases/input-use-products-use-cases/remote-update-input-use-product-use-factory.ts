import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateInputUseProductUseCase } from '../../../../data/use-cases/input-use-products-use-cases'

import type { UpdateInputUseProductUseCase } from '../../../../domain/use-cases/input-use-products-use-cases'

export function makeRemoteUpdateInputUseProductUseCase(): UpdateInputUseProductUseCase {
  return new RemoteUpdateInputUseProductUseCase(
    '/input-uses/products',
    makeApiHttpClient()
  )
}
