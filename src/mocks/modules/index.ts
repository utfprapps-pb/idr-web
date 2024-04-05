import { type HttpHandler } from 'msw'

import { userHandlers } from './user'

export const handlers: HttpHandler[] = [...userHandlers]
