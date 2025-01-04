import { type HttpHandler } from 'msw'

import { createPropertyService } from './services/createPropertyService'
import { deletePropertyService } from './services/deletePropertyService'
import { getPropertiesService } from './services/getPropertiesService'
import { getPropertyService } from './services/getPropertyService'
import { updatePropertyService } from './services/updatePropertyService'

export const propertyHandlers: HttpHandler[] = [
  createPropertyService,
  updatePropertyService,
  deletePropertyService,
  getPropertiesService,
  getPropertyService,
]
