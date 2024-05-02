import { RemoteLoginUser } from '@/data/useCases/'
import { makeApiHttpClient } from '@/main/factories/http'

import type { UserModel } from '@/domain/models'
import type { ILoginUser } from '@/domain/useCases'

export const makeRemoteLoginUser = (): ILoginUser =>
	new RemoteLoginUser('login', makeApiHttpClient<UserModel>())
