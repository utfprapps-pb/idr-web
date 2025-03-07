import type { MachineDetailsModel } from '../models/machines-model'
import type { RequestInterface, WithId } from '@/core/domain/types'

export type UpdateMachineUseCase = RequestInterface<
  {
    propertyId: string
    machine: WithId<MachineDetailsModel>
  },
  void
>
