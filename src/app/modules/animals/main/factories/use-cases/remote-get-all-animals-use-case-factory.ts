import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAllAnimalsUseCase } from '../../../data/use-cases/remote-get-all-animals-use-case'

import type {
  AnimalApiResponse,
  AnimalModel,
} from '../../../domain/models/animals-model'
import type { GetAllAnimalsUseCase } from '../../../domain/use-cases'

export function makeRemoteGetAllAnimalsUseCase(): GetAllAnimalsUseCase {
  return new RemoteGetAllAnimalsUseCase(
    'properties/:propertyId/animals',
    makeApiHttpClient<AnimalModel, AnimalApiResponse, AnimalApiResponse[]>()
  )
}
