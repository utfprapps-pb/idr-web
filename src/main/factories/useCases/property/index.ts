import { makeRemoteCreateProperty } from './remoteCreatePropertyFactory'
import { makeRemoteDeleteProperty } from './remoteDeletePropertyFactory'
import { makeRemoteGetProperties } from './remoteGetPropertiesFactory'
import { makeRemoteGetProperty } from './remoteGetPropertyFactory'
import { makeRemoteUpdateProperty } from './remoteUpdatePropertyFactory'

export const PropertyDataFactory = {
  makeRemoteCreateProperty,
  makeRemoteDeleteProperty,
  makeRemoteGetProperties,
  makeRemoteGetProperty,
  makeRemoteUpdateProperty,
}
