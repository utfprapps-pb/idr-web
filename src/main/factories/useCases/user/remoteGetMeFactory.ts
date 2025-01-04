import { UsersData } from '@/data/useCases/user'
import { makeApiHttpClient } from '@/main/factories/http'

import type { UserModel } from '@/domain/models/userModel'
import type { IGetMe } from '@/domain/useCases/user'

export const makeRemoteGetMe = (): IGetMe =>
  new UsersData.RemoteGetMe('users/me', makeApiHttpClient<UserModel>())
