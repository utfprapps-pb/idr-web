import type { RequestInterface } from '@/core/domain/types'

export type DeleteMachineUseCase = RequestInterface<
  {
    propertyId: string
    machineId: string
  },
  void
>
