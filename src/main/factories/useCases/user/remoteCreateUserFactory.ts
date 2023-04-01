import { RemoteCreateUser } from '@/data/useCases/user'
import { CreateUser } from '@/domain/useCases'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteCreateUser = (): CreateUser =>
	new RemoteCreateUser('user', makeAxiosHttpClient<void>())
