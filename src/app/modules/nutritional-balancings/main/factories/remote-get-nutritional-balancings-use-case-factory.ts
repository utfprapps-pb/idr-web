import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetNutritionalBalancingsUseCase } from '../../data/use-cases'

import type {
  NutritionalBalancingModel,
  NutritionalBalancingApiResponse,
} from '../../domain/models/nutritional-balancings-model'
import type { GetNutritionalBalancingsUseCase } from '../../domain/use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetNutritionalBalancingsUseCase(): GetNutritionalBalancingsUseCase {
  return new RemoteGetNutritionalBalancingsUseCase(
    'properties/:propertyId/nutritional-balancings',
    makeApiHttpClient<
      NutritionalBalancingModel,
      NutritionalBalancingApiResponse,
      ListApiResponse<NutritionalBalancingApiResponse[]>
    >()
  )
}
