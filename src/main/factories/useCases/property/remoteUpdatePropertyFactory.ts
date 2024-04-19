import { RemoteUpdateProperty } from '@/data/useCases/property'
import { IUpdateProperty } from '@/domain/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

export const makeRemoteUpdateProperty = (): IUpdateProperty =>
	new RemoteUpdateProperty('properties', makeApiHttpClient<void>())
