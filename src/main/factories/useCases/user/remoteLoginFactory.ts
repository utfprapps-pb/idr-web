import { RemoteLoginUser } from '@/data/useCases/'
import { UserModel } from '@/domain/models'
import { ILoginUser } from '@/domain/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

export const makeRemoteLoginUser = (): ILoginUser =>
	new RemoteLoginUser('login', makeApiHttpClient<UserModel>())
