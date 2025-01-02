import { type HttpHandler } from 'msw'

import { createForageService } from './services/createForageService'
import { deleteForageService } from './services/deleteForageService'
import { getForageService } from './services/getForageService'
import { getForagesService } from './services/getForagesService'
import { updateForageService } from './services/updateForageService'

export const forageHandlers: HttpHandler[] = [
  createForageService,
  getForageService,
  getForagesService,
  deleteForageService,
  updateForageService,
]
