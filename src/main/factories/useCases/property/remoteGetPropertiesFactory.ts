import { RemoteGetProperties } from '@/data/useCases'
import { makeApiHttpClient } from '@/main/factories/http'

import type { PropertyModel } from '@/domain/models'
import type { IGetProperties } from '@/domain/useCases'

export const makeRemoteGetProperties = (): IGetProperties =>
	new RemoteGetProperties('properties', makeApiHttpClient<PropertyModel[]>())
