import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetMeUseCase } from '../../../data/use-cases'

import type {
  UserApiResponse,
  UserModel,
} from '../../../domain/models/users-model'
import type { GetMeUseCase } from '../../../domain/use-cases'

export function makeRemoteGetMeUseCase(): GetMeUseCase {
  return new RemoteGetMeUseCase(
    'v1/users/me',
    makeApiHttpClient<UserModel, UserApiResponse>()
  )
}
