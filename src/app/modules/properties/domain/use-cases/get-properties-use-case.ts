import type { PropertyModel } from '../models/properties-model'
import type { RequestInterface, ListResponse } from '@/core/domain/types'

export type GetPropertiesParams = {
  terms?: string
  page?: number
  perPage?: number
}

export type GetPropertiesUseCase = RequestInterface<
  GetPropertiesParams,
  ListResponse<PropertyModel>
>
