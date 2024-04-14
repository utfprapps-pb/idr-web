import { type HttpHandler } from 'msw'

import { createPropertyService } from './services/createPropertyService'
import { getPropertiesService } from './services/getPropertiesService'

export const propertyHandlers: HttpHandler[] = [
	createPropertyService,
	getPropertiesService
]
