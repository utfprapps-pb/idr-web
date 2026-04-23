import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateForageAvailabilityUseCase } from '../../../../data/use-cases/forage-availability-use-cases'
import { type CreateForageAvailabilityUseCase } from '../../../../domain/use-cases/forage-availability-use-cases'

export function makeRemoteCreateForageAvailabilityUseCase(): CreateForageAvailabilityUseCase {
  return new RemoteCreateForageAvailabilityUseCase(
    '/properties/:propertyId/forage-availabilities',
    makeApiHttpClient()
  )
}
