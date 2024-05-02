import { RemoteGetProperty } from '@/data/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

import type { PropertyDetailsModel } from '@/domain/models'
import type { IGetProperty } from '@/domain/useCases'

export const makeRemoteGetProperty = (): IGetProperty =>
	new RemoteGetProperty('properties', makeApiHttpClient<PropertyDetailsModel>())
