import type { MachineDetailsModel } from '../models/machines-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateMachineUseCase = RequestInterface<
  { propertyId: string; machine: MachineDetailsModel },
  void
>
