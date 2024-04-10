import { RemoteGetProperties } from '@/data/useCases'
import { PropertyModel } from '@/domain/models'
import { IGetProperties } from '@/domain/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

export const makeRemoteGetProperties = (): IGetProperties =>
	new RemoteGetProperties('properties', makeApiHttpClient<PropertyModel[]>())
