import { RemoteCreateUser } from '@/data/useCases/user'
import { ICreateUser } from '@/domain/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

export const makeRemoteCreateUser = (): ICreateUser =>
	new RemoteCreateUser('users', makeApiHttpClient<void>())
