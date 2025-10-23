import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateNutritionalBalancingUseCase } from '../../data/use-cases'

import type { CreateNutritionalBalancingUseCase } from '../../domain/use-cases'

export function makeRemoteCreateNutritionalBalancingUseCase(): CreateNutritionalBalancingUseCase {
  return new RemoteCreateNutritionalBalancingUseCase(
    'properties/:propertyId/nutritional-balancings',
    makeApiHttpClient()
  )
}
