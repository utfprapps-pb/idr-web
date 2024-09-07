import { type HttpHandler } from 'msw'

import { loginService } from './services/loginService'

export const authHandlers: HttpHandler[] = [loginService]
