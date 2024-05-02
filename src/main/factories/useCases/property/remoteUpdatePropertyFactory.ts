import { RemoteUpdateProperty } from '@/data/useCases/property'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IUpdateProperty } from '@/domain/useCases'

export const makeRemoteUpdateProperty = (): IUpdateProperty =>
	new RemoteUpdateProperty('properties', makeApiHttpClient<void>())
