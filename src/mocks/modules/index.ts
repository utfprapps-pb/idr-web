import { type HttpHandler } from 'msw'

import { propertyHandlers } from './property'
import { userHandlers } from './user'

export const handlers: HttpHandler[] = [...userHandlers, ...propertyHandlers]
