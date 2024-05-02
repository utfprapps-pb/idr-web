import { RemoteCreateProperty } from '@/data/useCases/property'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ICreateProperty } from '@/domain/useCases'

export const makeRemoteCreateProperty = (): ICreateProperty =>
	new RemoteCreateProperty('properties', makeApiHttpClient<void>())
