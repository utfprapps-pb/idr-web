import type { RequestInterface } from '@/core/domain/types'

export type DeleteMachineUseCase = RequestInterface<
  {
    propertyId: number
    machineId: number
  },
  void
>
