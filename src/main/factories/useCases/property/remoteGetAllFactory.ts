import { PropertiesData } from '@/data/useCases/property'
import { makeApiHttpClient } from '@/main/factories/http'

import type { PropertyModel } from '@/domain/models/propertyModel'
import type { IGetProperties } from '@/domain/useCases/property'

export const makeRemoteGetAll = (): IGetProperties =>
	new PropertiesData.RemoteGetAll(
		'properties',
		makeApiHttpClient<PropertyModel[]>()
	)
