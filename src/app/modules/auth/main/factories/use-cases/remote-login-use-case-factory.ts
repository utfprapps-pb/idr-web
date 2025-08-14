import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteLoginUseCase } from '../../../data/use-cases'

import type {
  AuthApiResponse,
  AuthModel,
} from '../../../domain/models/auth-model'
import type { LoginUseCase } from '../../../domain/use-cases'

export function makeRemoteLoginUseCase(): LoginUseCase {
  return new RemoteLoginUseCase(
    'login',
    makeApiHttpClient<AuthModel, AuthApiResponse>()
  )
}
