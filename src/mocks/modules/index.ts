import { type HttpHandler } from 'msw'

import { authHandlers } from './auth'
import { forageHandlers } from './forages'
import { improvementHandlers } from './improvements'
import { machineHandlers } from './machines'
import { propertyHandlers } from './properties'
import { userHandlers } from './users'
import { vegetableHandlers } from './vegetables'

export const handlers: HttpHandler[] = [
  ...authHandlers,
  ...forageHandlers,
  ...propertyHandlers,
  ...userHandlers,
  ...vegetableHandlers,
  ...improvementHandlers,
  ...machineHandlers,
]
