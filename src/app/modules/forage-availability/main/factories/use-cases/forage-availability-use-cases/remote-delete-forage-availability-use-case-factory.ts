import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteForageAvailabilityUseCase } from '../../../../data/use-cases/forage-availability-use-cases'
import { type DeleteForageAvailabilityUseCase } from '../../../../domain/use-cases/forage-availability-use-cases'

export function makeRemoteDeleteForageAvailabilityUseCase(): DeleteForageAvailabilityUseCase {
  return new RemoteDeleteForageAvailabilityUseCase(
    '/properties/:propertyId/forage-availabilities',
    makeApiHttpClient()
  )
}
