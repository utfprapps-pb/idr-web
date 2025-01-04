import { makeRemoteCreateUser } from './remoteCreateUserFactory'
import { makeRemoteGetAllUsers } from './remoteGetAllUsersFactory'
import { makeRemoteGetMe } from './remoteGetMeFactory'

export const UserDataFactory = {
  makeRemoteGetMe,
  makeRemoteCreateUser,
  makeRemoteGetAllUsers,
}
