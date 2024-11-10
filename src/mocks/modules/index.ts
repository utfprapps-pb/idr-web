import { type HttpHandler } from 'msw'

import { authHandlers } from './auth'
import { propertyHandlers } from './property'
import { userHandlers } from './user'

export const handlers: HttpHandler[] = [
  ...authHandlers,
  ...userHandlers,
  ...propertyHandlers,
]
