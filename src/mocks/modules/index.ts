import { type HttpHandler } from 'msw'

import { animalHandlers } from './animals'
import { authHandlers } from './auth'
import { breedHandlers } from './breeds'
import { forageHandlers } from './forages'
import { improvementHandlers } from './improvements'
import { machineHandlers } from './machines'
import { propertyHandlers } from './properties'
import { userHandlers } from './users'
import { vegetableHandlers } from './vegetables'

export const handlers: HttpHandler[] = [
  ...animalHandlers,
  ...authHandlers,
  ...breedHandlers,
  ...forageHandlers,
  ...improvementHandlers,
  ...machineHandlers,
  ...propertyHandlers,
  ...userHandlers,
  ...vegetableHandlers,
]
