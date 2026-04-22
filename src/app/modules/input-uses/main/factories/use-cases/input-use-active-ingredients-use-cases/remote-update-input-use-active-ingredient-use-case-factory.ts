import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateInputUseActiveIngredientUseCase } from '../../../../data/use-cases/input-use-active-ingredients-use-cases'

import type { UpdateInputUseActiveIngredientUseCase } from '../../../../domain/use-cases/input-use-active-ingredients-use-cases'

export function makeRemoteUpdateInputUseActiveIngredientUseCase(): UpdateInputUseActiveIngredientUseCase {
  return new RemoteUpdateInputUseActiveIngredientUseCase(
    '/input-uses/active-ingredients',
    makeApiHttpClient()
  )
}
