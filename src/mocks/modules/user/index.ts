import { type HttpHandler } from 'msw'

import { getAllUsersService } from './services/getAllUsersService'
import { meService } from './services/meService'

export const userHandlers: HttpHandler[] = [meService, getAllUsersService]
