import type { MachineDetailsModel } from '@/domain/models/machineModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type ICreateMachine = IRequestInterface<
  { propertyId: string; machine: MachineDetailsModel },
  void
>
