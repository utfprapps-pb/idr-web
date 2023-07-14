import { RemoteLoginUser } from '@/data/useCases/user'
import { UserModel } from '@/domain/models'
import { LoginUser } from '@/domain/useCases'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteLoginUser = (): LoginUser =>
	new RemoteLoginUser('login', makeAxiosHttpClient<UserModel>())
