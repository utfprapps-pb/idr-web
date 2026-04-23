import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateInputUseActiveIngredientUseCase } from '../../../../data/use-cases/input-use-active-ingredients-use-cases'

import type { CreateInputUseActiveIngredientUseCase } from '../../../../domain/use-cases/input-use-active-ingredients-use-cases'

export function makeRemoteCreateInputUseActiveIngredientUseCase(): CreateInputUseActiveIngredientUseCase {
  return new RemoteCreateInputUseActiveIngredientUseCase(
    '/input-uses/active-ingredients',
    makeApiHttpClient()
  )
}
