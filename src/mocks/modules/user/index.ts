import { type HttpHandler } from 'msw'

import { getAllUsersService } from './services/getAllUsersService'
import { loginService } from './services/loginService'

export const userHandlers: HttpHandler[] = [loginService, getAllUsersService]
