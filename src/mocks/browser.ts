import { setupWorker } from 'msw/browser'

import { handlers } from './modules'

export const worker = setupWorker(...handlers)
