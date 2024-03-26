import { UserInfoModel } from '@/domain/models'

export interface IGetUserInfo {
	execute: () => Promise<UserInfoModel>
}
