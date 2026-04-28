import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetForageAvailabilityUseCase } from '../../../../data/use-cases/forage-availability-use-cases'
import { type GetForageAvailabilityUseCase } from '../../../../domain/use-cases/forage-availability-use-cases'

export function makeRemoteGetForageAvailabilityUseCase(): GetForageAvailabilityUseCase {
  return new RemoteGetForageAvailabilityUseCase(
    '/properties/:propertyId/forage-availabilities',
    makeApiHttpClient()
  )
}
