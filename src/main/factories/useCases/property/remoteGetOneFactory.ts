import { PropertiesData } from '@/data/useCases/property'
import { makeApiHttpClient } from '@/main/factories/http'

import type { PropertyDetailsModel } from '@/domain/models/propertyModel'
import type { IGetProperty } from '@/domain/useCases/property'

export const makeRemoteGetOne = (): IGetProperty =>
	new PropertiesData.RemoteGetOne(
		'properties',
		makeApiHttpClient<PropertyDetailsModel>()
	)
