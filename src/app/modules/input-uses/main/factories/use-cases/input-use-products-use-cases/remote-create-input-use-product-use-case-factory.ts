import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateInputUseProductUseCase } from '../../../../data/use-cases/input-use-products-use-cases'

import type { CreateInputUseProductUseCase } from '../../../../domain/use-cases/input-use-products-use-cases'

export function makeRemoteCreateInputUseProductUseCase(): CreateInputUseProductUseCase {
  return new RemoteCreateInputUseProductUseCase(
    '/input-uses/products',
    makeApiHttpClient()
  )
}
