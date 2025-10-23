import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateNutritionalBalancingUseCase } from '../../data/use-cases'

import type { UpdateNutritionalBalancingUseCase } from '../../domain/use-cases'

export function makeRemoteUpdateNutritionalBalancingUseCase(): UpdateNutritionalBalancingUseCase {
  return new RemoteUpdateNutritionalBalancingUseCase(
    'properties/:propertyId/nutritional-balancings',
    makeApiHttpClient()
  )
}
