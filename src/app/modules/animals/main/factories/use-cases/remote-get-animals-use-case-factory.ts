import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalsUseCase } from '../../../data/use-cases'

import type { AnimalModel } from '../../../domain/models/animals-model'
import type { GetAnimalsUseCase } from '../../../domain/use-cases'

export function makeRemoteGetAnimalsUseCase(): GetAnimalsUseCase {
  return new RemoteGetAnimalsUseCase(
    'properties/:propertyId/animals',
    makeApiHttpClient<AnimalModel[]>()
  )
}
