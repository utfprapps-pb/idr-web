import { type HttpHandler } from 'msw'

import { authHandlers } from './auth'
import { perennialForageHandlers } from './perennialForage'
import { propertyHandlers } from './property'
import { userHandlers } from './user'

export const handlers: HttpHandler[] = [
  ...authHandlers,
  ...perennialForageHandlers,
  ...propertyHandlers,
  ...userHandlers,
]
