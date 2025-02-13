import { type HttpHandler } from 'msw'

import { createAnimalService } from './services/createAnimalService'
import { deleteAnimalService } from './services/deleteAnimalService'
import { getAnimalService } from './services/getAnimalService'
import { getAnimalsService } from './services/getAnimalsService'
import { updateAnimalService } from './services/updateAnimalService'

export const animalHandlers: HttpHandler[] = [
  createAnimalService,
  deleteAnimalService,
  getAnimalService,
  getAnimalsService,
  updateAnimalService,
]
