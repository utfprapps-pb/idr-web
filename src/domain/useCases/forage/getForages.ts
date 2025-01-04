import type { ForageModel } from '@/domain/models/forageModel'
import type {
  IRequestInterface,
  IListParams,
  IListResponse,
} from '@/domain/shared/types'

export type IGetForages = IRequestInterface<
  {
    propertyId: string
    queryParams: IListParams<keyof ForageModel>
  },
  IListResponse<ForageModel>
>
