import type { MachineModel } from '../models/machines-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetMachinesUseCase = RequestInterface<
  {
    propertyId: string
    queryParams: ListParams<keyof MachineModel>
  },
  ListResponse<MachineModel>
>
