import type { MachineDetailsModel } from '../models/machines-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetMachineUseCase = RequestInterface<
  {
    propertyId: number
    machineId: number
  },
  MachineDetailsModel
>
