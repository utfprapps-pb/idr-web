import type { IRequestInterface } from '@/domain/shared/types'

export type IDeleteMachine = IRequestInterface<
  {
    propertyId: string
    machineId: string
  },
  void
>
