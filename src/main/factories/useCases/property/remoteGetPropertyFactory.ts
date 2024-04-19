import { RemoteGetProperty } from '@/data/useCases'
import { PropertyDetailsModel } from '@/domain/models'
import { IGetProperty } from '@/domain/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

export const makeRemoteGetProperty = (): IGetProperty =>
	new RemoteGetProperty('properties', makeApiHttpClient<PropertyDetailsModel>())
