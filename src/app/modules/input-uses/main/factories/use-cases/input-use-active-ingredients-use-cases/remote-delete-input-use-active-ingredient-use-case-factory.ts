import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteInputUseActiveIngredientUseCase } from '../../../../data/use-cases/input-use-active-ingredients-use-cases'

import type { DeleteInputUseActiveIngredientUseCase } from '../../../../domain/use-cases/input-use-active-ingredients-use-cases'

export function makeRemoteDeleteInputUseActiveIngredientUseCase(): DeleteInputUseActiveIngredientUseCase {
  return new RemoteDeleteInputUseActiveIngredientUseCase(
    '/input-uses/active-ingredients',
    makeApiHttpClient()
  )
}
