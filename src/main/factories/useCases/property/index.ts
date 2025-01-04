import { makeRemoteCreateProperty } from './remoteCreatePropertyFactory'
import { makeRemoteDeleteProperty } from './remoteDeletePropertyFactory'
import { makeRemoteGetProperties } from './remoteGetPropertiesFactory'
import { makeRemoteGetProperty } from './remoteGetPropertyFactory'
import { makeRemoteUpdateProperty } from './remoteUpdatePropertyFactory'

export const PropertyDataFactory = {
  makeRemoteCreate: makeRemoteCreateProperty,
  makeRemoteDelete: makeRemoteDeleteProperty,
  makeRemoteGetAll: makeRemoteGetProperties,
  makeRemoteGetOne: makeRemoteGetProperty,
  makeRemoteUpdate: makeRemoteUpdateProperty,
}
