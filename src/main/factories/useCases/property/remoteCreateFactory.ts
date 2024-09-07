import { PropertiesData } from '@/data/useCases/property'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ICreateProperty } from '@/domain/useCases/property'

export const makeRemoteCreate = (): ICreateProperty =>
	new PropertiesData.RemoteCreate('properties', makeApiHttpClient<void>())
