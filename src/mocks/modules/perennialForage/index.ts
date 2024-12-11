import { type HttpHandler } from 'msw'

import { getPerennialForages } from './services/getPerennialForages'

export const perennialForageHandlers: HttpHandler[] = [getPerennialForages]
