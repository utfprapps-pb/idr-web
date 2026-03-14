import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetNutritionalBalancingUseCase } from '../../data/use-cases'

import type {
  NutritionalBalancingDetailsModel,
  NutritionalBalancingDetailsApiResponse,
} from '../../domain/models/nutritional-balancings-model'
import type { GetNutritionalBalancingUseCase } from '../../domain/use-cases'

export function makeRemoteGetNutritionalBalancingUseCase(): GetNutritionalBalancingUseCase {
  return new RemoteGetNutritionalBalancingUseCase(
    'properties/:propertyId/nutritional-balancings',
    makeApiHttpClient<
      NutritionalBalancingDetailsModel,
      NutritionalBalancingDetailsApiResponse
    >()
  )
}
