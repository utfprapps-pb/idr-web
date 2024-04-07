import { type HttpHandler } from 'msw'

import { getPropertiesService } from './services/getPropertiesService'

export const propertyHandlers: HttpHandler[] = [getPropertiesService]
