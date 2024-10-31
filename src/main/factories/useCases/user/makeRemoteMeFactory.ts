import { UsersData } from '@/data/useCases/user'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IMeUser } from '@/domain/useCases/user'

export const makeRemoteMe = (): IMeUser =>
  new UsersData.RemoteMe('users/me', makeApiHttpClient<void>())
