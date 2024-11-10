import { RemoteLogin } from '@/data/useCases/auth'
import { makeApiHttpClient } from '@/main/factories/http'

import type { AuthModel } from '@/domain/models/authModel'
import type { ILogin } from '@/domain/useCases/auth'

export const makeRemoteLogin = (): ILogin =>
  new RemoteLogin('login', makeApiHttpClient<AuthModel>())
