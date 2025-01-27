import type { MachineDetailsModel } from '@/domain/models/machineModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type IGetMachine = IRequestInterface<
  {
    propertyId: string
    machineId: string
  },
  MachineDetailsModel
>
