import type { MachineModel } from '@/domain/models/machineModel'
import type {
  IRequestInterface,
  IListParams,
  IListResponse,
} from '@/domain/shared/types'

export type IGetMachines = IRequestInterface<
  {
    propertyId: string
    queryParams: IListParams<keyof MachineModel>
  },
  IListResponse<MachineModel>
>
