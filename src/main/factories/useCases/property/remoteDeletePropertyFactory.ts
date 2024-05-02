import { RemoteDeleteProperty } from '@/data/useCases/property'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IDeleteProperty } from '@/domain/useCases'

export const makeRemoteDeleteProperty = (): IDeleteProperty =>
	new RemoteDeleteProperty('properties', makeApiHttpClient<void>())
