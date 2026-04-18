import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteInputUseProductUseCase } from '../../../../data/use-cases/input-use-products-use-cases'

import type { DeleteInputUseProductUseCase } from '../../../../domain/use-cases/input-use-products-use-cases'

export function makeRemoteDeleteInputUseProductUseCase(): DeleteInputUseProductUseCase {
  return new RemoteDeleteInputUseProductUseCase(
    '/input-uses/products',
    makeApiHttpClient()
  )
}
