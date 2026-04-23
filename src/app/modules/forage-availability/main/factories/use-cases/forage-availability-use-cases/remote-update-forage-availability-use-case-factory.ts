import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateForageAvailabilityUseCase } from '../../../../data/use-cases/forage-availability-use-cases'
import { type UpdateForageAvailabilityUseCase } from '../../../../domain/use-cases/forage-availability-use-cases'

export function makeRemoteUpdateForageAvailabilityUseCase(): UpdateForageAvailabilityUseCase {
  return new RemoteUpdateForageAvailabilityUseCase(
    '/properties/:propertyId/forage-availabilities',
    makeApiHttpClient()
  )
}
