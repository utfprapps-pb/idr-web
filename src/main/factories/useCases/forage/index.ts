import { makeRemoteCreateForage } from './remoteCreateForageFactory'
import { makeRemoteDeleteForage } from './remoteDeleteForageFactory'
import { makeRemoteGetForage } from './remoteGetForageFactory'
import { makeRemoteGetForages } from './remoteGetForagesFactory'
import { makeRemoteUpdateForage } from './remoteUpdateForageFactory'

export const ForageDataFactory = {
  makeRemoteCreateForage,
  makeRemoteDeleteForage,
  makeRemoteGetForages,
  makeRemoteGetForage,
  makeRemoteUpdateForage,
}
