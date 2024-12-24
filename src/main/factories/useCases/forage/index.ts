import { makeRemoteCreate } from './remoteCreateFactory'
import { makeRemoteDelete } from './remoteDeleteFactory'
import { makeRemoteGetAll } from './remoteGetAllFactory'
import { makeRemoteGetOne } from './remoteGetOneFactory'
import { makeRemoteUpdate } from './remoteUpdateFactory'

export const ForageDataFactory = {
  makeRemoteCreate,
  makeRemoteDelete,
  makeRemoteGetAll,
  makeRemoteGetOne,
  makeRemoteUpdate,
}
