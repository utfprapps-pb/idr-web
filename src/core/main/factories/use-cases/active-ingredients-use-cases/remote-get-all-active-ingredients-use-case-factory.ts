import { RemoteGetAllActiveIngredientsUseCase } from '@/core/data/use-cases/active-ingredients-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type {
  ActiveIngredientApiResponse,
  ActiveIngredientModel,
} from '@/core/domain/models/active-ingredients-model'
import type { ListApiResponse } from '@/core/domain/types'
import type { GetAllActiveIngredientsUseCase } from '@/core/domain/use-cases/active-ingredients-use-cases'

export function makeRemoteGetAllActiveIngredientsUseCase(): GetAllActiveIngredientsUseCase {
  return new RemoteGetAllActiveIngredientsUseCase(
    'active-ingredients',
    makeApiHttpClient<
      ActiveIngredientModel,
      ActiveIngredientApiResponse,
      ListApiResponse<ActiveIngredientApiResponse[]>
    >()
  )
}
