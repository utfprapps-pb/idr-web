import { RemoteCreateProperty } from '@/data/useCases/property'
import { ICreateProperty } from '@/domain/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

export const makeRemoteCreateProperty = (): ICreateProperty =>
	new RemoteCreateProperty('properties', makeApiHttpClient<void>())
