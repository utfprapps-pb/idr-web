import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetForageAvailabilitiesUseCase } from '../../../../data/use-cases/forage-availability-use-cases'
import { type GetForageAvailabilitiesUseCase } from '../../../../domain/use-cases/forage-availability-use-cases'

export function makeRemoteGetForageAvailabilitiesUseCase(): GetForageAvailabilitiesUseCase {
  return new RemoteGetForageAvailabilitiesUseCase(
    '/properties/:propertyId/forage-availabilities',
    makeApiHttpClient()
  )
}
