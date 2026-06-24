import type { RegionModel } from '../models/regions-model'
import type { RequestInterface, ListResponse } from '@/core/domain/types'

export type GetRegionsParams = {
  terms?: string
  page?: number
  perPage?: number
}

export type GetRegionsUseCase = RequestInterface<
  GetRegionsParams,
  ListResponse<RegionModel>
>
