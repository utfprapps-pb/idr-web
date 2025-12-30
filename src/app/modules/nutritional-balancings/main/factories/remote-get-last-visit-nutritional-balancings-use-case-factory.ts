import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetLastVisitNutritionalBalancingsUseCase } from '../../data/use-cases/remote-get-last-visit-nutritional-balancings-use-case'

import type { GetLastVisitNutritionalBalancingsUseCase } from '../../domain/use-cases'

export function makeRemoteGetLastVisitNutritionalBalancingsUseCase(): GetLastVisitNutritionalBalancingsUseCase {
  return new RemoteGetLastVisitNutritionalBalancingsUseCase(
    'properties/:propertyId/nutritional-balancings',
    makeApiHttpClient()
  )
}
