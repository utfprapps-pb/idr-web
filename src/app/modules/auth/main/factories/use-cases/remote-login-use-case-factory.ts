import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteLoginUseCase } from '../../../data/use-cases'

import type { AuthApiResponse } from '../../../domain/models/auth-model'
import type {
  LoginApiParams,
  LoginParams,
  LoginUseCase,
} from '../../../domain/use-cases'

export function makeRemoteLoginUseCase(): LoginUseCase {
  return new RemoteLoginUseCase(
    'login',
    makeApiHttpClient<LoginParams, LoginApiParams, AuthApiResponse>()
  )
}
