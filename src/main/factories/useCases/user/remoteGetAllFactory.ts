import { UsersData } from '@/data/useCases/user'
import { makeApiHttpClient } from '@/main/factories/http'

import type { Option } from '@/domain/shared/types'
import type { IGetAllUsers } from '@/domain/useCases/user'

export const makeRemoteGetAll = (): IGetAllUsers =>
	new UsersData.RemoteGetAll('users/all', makeApiHttpClient<Option[]>())
