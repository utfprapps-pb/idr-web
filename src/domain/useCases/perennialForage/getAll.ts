import type { PerennialForageModel } from '@/domain/models/perennialForageModel'
import type {
  IRequestInterface,
  IListParams,
  IListResponse,
} from '@/domain/shared/types'

export type IGetPerennialForages = IRequestInterface<
  IListParams<keyof PerennialForageModel>,
  IListResponse<PerennialForageModel>
>
