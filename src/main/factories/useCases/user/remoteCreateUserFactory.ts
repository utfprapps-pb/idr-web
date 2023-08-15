import { RemoteCreateUser } from '@/data/useCases/user'
import { CreateUser } from '@/domain/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

export const makeRemoteCreateUser = (): CreateUser =>
	new RemoteCreateUser('users', makeApiHttpClient<void>())
