import { type HttpHandler } from 'msw'

import { getAllBreedsService } from './services/getAllBreedsService'

export const breedHandlers: HttpHandler[] = [getAllBreedsService]
