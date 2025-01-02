import { type HttpHandler } from 'msw'

import { authHandlers } from './auth'
import { forageHandlers } from './forage'
import { propertyHandlers } from './property'
import { userHandlers } from './user'
import { vegetableHandlers } from './vegetable'

export const handlers: HttpHandler[] = [
  ...authHandlers,
  ...forageHandlers,
  ...propertyHandlers,
  ...userHandlers,
  ...vegetableHandlers,
]
