import { type HttpHandler } from 'msw'

import { createPropertyService } from './services/createPropertyService'
import { deletePropertyService } from './services/deletePropertyService'
import { getPropertiesService } from './services/getPropertiesService'
import { getPropertyService } from './services/getPropertyService'

export const propertyHandlers: HttpHandler[] = [
	createPropertyService,
	deletePropertyService,
	getPropertiesService,
	getPropertyService
]
