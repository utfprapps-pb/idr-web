import { type HttpHandler } from 'msw'

import { createMachineService } from './services/createMachineService'
import { deleteMachineService } from './services/deleteMachineService'
import { getMachineService } from './services/getMachineService'
import { getMachinesService } from './services/getMachinesService'
import { updateMachineService } from './services/updateMachineService'

export const machineHandlers: HttpHandler[] = [
  createMachineService,
  deleteMachineService,
  getMachineService,
  getMachinesService,
  updateMachineService,
]
