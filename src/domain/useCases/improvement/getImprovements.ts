import type { ImprovementModel } from '@/domain/models/improvementModel'
import type {
  IRequestInterface,
  IListParams,
  IListResponse,
} from '@/domain/shared/types'

export type IGetImprovements = IRequestInterface<
  {
    propertyId: string
    queryParams: IListParams<keyof ImprovementModel>
  },
  IListResponse<ImprovementModel>
>
