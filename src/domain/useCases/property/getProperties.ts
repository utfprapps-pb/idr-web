import type { PropertyModel } from '@/domain/models/propertyModel'
import type {
  IRequestInterface,
  IListParams,
  IListResponse,
} from '@/domain/shared/types'

export type IGetProperties = IRequestInterface<
  IListParams<keyof PropertyModel>,
  IListResponse<PropertyModel>
>
