import { type HttpHandler } from 'msw'

import { createPerennialForageService } from './services/createPerennialForageService'
import { deletePerennialForageService } from './services/deletePerennialForageService'
import { getPerennialForageService } from './services/getPerennialForageService'
import { getPerennialForagesService } from './services/getPerennialForagesService'
import { updatePerenialForageService } from './services/updatePerennialForageService'

export const perennialForageHandlers: HttpHandler[] = [
  createPerennialForageService,
  getPerennialForageService,
  getPerennialForagesService,
  deletePerennialForageService,
  updatePerenialForageService,
]
