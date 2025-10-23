import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteNutritionalBalancingUseCase } from '../../data/use-cases'

import type { DeleteNutritionalBalancingUseCase } from '../../domain/use-cases'

export function makeRemoteDeleteNutritionalBalancingUseCase(): DeleteNutritionalBalancingUseCase {
  return new RemoteDeleteNutritionalBalancingUseCase(
    'properties/:propertyId/nutritional-balancings',
    makeApiHttpClient()
  )
}
