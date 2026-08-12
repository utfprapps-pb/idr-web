import type { RegionModel } from '../models/regions-model'
import type {
  RequestInterface,
  ListResponse,
  SearchParams,
} from '@/core/domain/types'

export type GetRegionsParams = SearchParams

export type GetRegionsUseCase = RequestInterface<
  GetRegionsParams,
  ListResponse<RegionModel>
>
