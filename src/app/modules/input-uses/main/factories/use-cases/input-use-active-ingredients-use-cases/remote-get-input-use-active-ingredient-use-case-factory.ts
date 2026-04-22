import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetInputUseActiveIngredientUseCase } from '../../../../data/use-cases/input-use-active-ingredients-use-cases'

import type { GetInputUseActiveIngredientUseCase } from '../../../../domain/use-cases/input-use-active-ingredients-use-cases'

export function makeRemoteGetInputUseActiveIngredientUseCase(): GetInputUseActiveIngredientUseCase {
  return new RemoteGetInputUseActiveIngredientUseCase(
    '/input-uses/active-ingredients',
    makeApiHttpClient()
  )
}
