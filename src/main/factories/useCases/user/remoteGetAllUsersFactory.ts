import { RemoteGetAllUsers } from '@/data/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

import type { Option } from '@/domain/shared'
import type { IGetAllUsers } from '@/domain/useCases'

export const makeRemoteGetAllUsers = (): IGetAllUsers =>
	new RemoteGetAllUsers('users/all', makeApiHttpClient<Option[]>())
