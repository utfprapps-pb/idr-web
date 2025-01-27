import type { MachineDetailsModel } from '@/domain/models/machineModel'
import type { IRequestInterface } from '@/domain/shared/types'
import type { WithId } from '@/domain/shared/types/withId'

export type IUpdateMachine = IRequestInterface<
  {
    propertyId: string
    machine: WithId<MachineDetailsModel>
  },
  void
>
