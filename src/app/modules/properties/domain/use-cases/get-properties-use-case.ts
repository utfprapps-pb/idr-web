import type { PropertyModel } from '../models/properties-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetPropertiesUseCase = RequestInterface<
  ListParams<keyof PropertyModel>,
  ListResponse<PropertyModel>
>
