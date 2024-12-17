import { type HttpHandler } from 'msw'

import { getAllVegetablesService } from './services/getAllVegetablesService'

export const vegetableHandlers: HttpHandler[] = [getAllVegetablesService]
