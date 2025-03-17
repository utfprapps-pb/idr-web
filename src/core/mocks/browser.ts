import { type HttpHandler } from 'msw'
import { setupWorker } from 'msw/browser'

import {
  createAnimalChildBirthHandler,
  deleteAnimalChildBirthHandler,
  getAnimalChildBirthHandler,
  getAnimalChildBirthsHandler,
  updateAnimalChildBirthHandler,
} from '@/app/modules/animal-child-births/mocks/handlers'
import {
  createAnimalHandler,
  deleteAnimalHandler,
  getAnimalHandler,
  getAnimalsHandler,
  updateAnimalHandler,
} from '@/app/modules/animals/mocks/handlers/'
import { loginHandler } from '@/app/modules/auth/mocks/handlers'
import {
  createForageHandler,
  deleteForageHandler,
  getForageHandler,
  getForagesHandler,
  updateForageHandler,
} from '@/app/modules/forages/mocks/handlers'
import {
  createImprovementHandler,
  deleteImprovementHandler,
  getImprovementHandler,
  getImprovementsHandler,
  updateImprovementHandler,
} from '@/app/modules/improvements/mocks/handlers'
import {
  createMachineHandler,
  deleteMachineHandler,
  getMachineHandler,
  getMachinesHandler,
  updateMachineHandler,
} from '@/app/modules/machines/mocks/handlers'
import {
  createPropertyHandler,
  deletePropertyHandler,
  getPropertiesHandler,
  getPropertyHandler,
  updatePropertyHandler,
} from '@/app/modules/properties/mocks/handlers'

import { getAllBreedsHandler } from './handlers/breeds-handlers'
import { getAllUsersHandler, meHandler } from './handlers/users-handlers'
import { getAllVegetablesHandler } from './handlers/vegetables-handlers'

const handlers: HttpHandler[] = [
  loginHandler,

  getAllBreedsHandler,

  getAllVegetablesHandler,

  getAllUsersHandler,
  meHandler,

  createAnimalHandler,
  deleteAnimalHandler,
  getAnimalHandler,
  getAnimalsHandler,
  updateAnimalHandler,

  createForageHandler,
  deleteForageHandler,
  getForageHandler,
  getForagesHandler,
  updateForageHandler,

  createImprovementHandler,
  deleteImprovementHandler,
  getImprovementHandler,
  getImprovementsHandler,
  updateImprovementHandler,

  createPropertyHandler,
  deletePropertyHandler,
  getPropertiesHandler,
  getPropertyHandler,
  updatePropertyHandler,

  createMachineHandler,
  deleteMachineHandler,
  getMachineHandler,
  getMachinesHandler,
  updateMachineHandler,

  createAnimalChildBirthHandler,
  deleteAnimalChildBirthHandler,
  getAnimalChildBirthHandler,
  getAnimalChildBirthsHandler,
  updateAnimalChildBirthHandler,
]

export const worker = setupWorker(...handlers)
