import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetInputUseActiveIngredientsUseCase } from '../../../../data/use-cases/input-use-active-ingredients-use-cases'

import type { GetInputUseActiveIngredientsUseCase } from '../../../../domain/use-cases/input-use-active-ingredients-use-cases'

export function makeRemoteGetInputUseActiveIngredientsUseCase(): GetInputUseActiveIngredientsUseCase {
  return new RemoteGetInputUseActiveIngredientsUseCase(
    '/input-uses/active-ingredients',
    makeApiHttpClient()
  )
}
