import { RemoteCreateUser } from '@/data/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ICreateUser } from '@/domain/useCases'

export const makeRemoteCreateUser = (): ICreateUser =>
	new RemoteCreateUser('users', makeApiHttpClient<void>())
