import { RemoteGetUserInfo } from '@/data/useCases/user/remoteGetUserInfo'
import { UserInfoModel } from '@/domain/models'
import { IGetUserInfo } from '@/domain/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

export const makeRemoteGetUserInfo = (): IGetUserInfo =>
	new RemoteGetUserInfo(
		'users/findSelfUser',
		makeApiHttpClient<UserInfoModel>()
	)
