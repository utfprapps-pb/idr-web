import { PropertiesData } from '@/data/useCases/property'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IUpdateProperty } from '@/domain/useCases/property'

export const makeRemoteUpdate = (): IUpdateProperty =>
	new PropertiesData.RemoteUpdate('properties', makeApiHttpClient<void>())
