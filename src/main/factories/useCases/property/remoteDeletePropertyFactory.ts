import { RemoteDeleteProperty } from '@/data/useCases/property'
import { IDeleteProperty } from '@/domain/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

export const makeRemoteDeleteProperty = (): IDeleteProperty =>
	new RemoteDeleteProperty('properties', makeApiHttpClient<void>())
