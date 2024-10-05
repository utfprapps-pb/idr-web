import { UsersData } from '@/data/useCases/user'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ICreateUser } from '@/domain/useCases/user'

export const makeRemoteCreate = (): ICreateUser =>
	new UsersData.RemoteCreate('users', makeApiHttpClient<void>())
