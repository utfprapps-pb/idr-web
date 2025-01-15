import { type HttpHandler } from 'msw'

import { createImprovementService } from './services/createImprovementService'
import { deleteImprovementService } from './services/deleteImprovementService'
import { getImprovementService } from './services/getImprovementService'
import { getImprovementsService } from './services/getImprovementsService'
import { updateImprovementService } from './services/updateImprovementService'

export const improvementHandlers: HttpHandler[] = [
  createImprovementService,
  deleteImprovementService,
  getImprovementService,
  getImprovementsService,
  updateImprovementService,
]
