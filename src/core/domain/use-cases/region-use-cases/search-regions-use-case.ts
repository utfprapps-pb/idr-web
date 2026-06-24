import type { RegionModel } from '../../models/region-model'
import type { RequestInterface } from '@/core/domain/types'

export type SearchRegionsParams = {
  terms?: string
  page?: number
  perPage?: number
}

export type SearchRegionsResult = {
  items: RegionModel[]
  total: number
}

export type SearchRegionsUseCase = RequestInterface<
  SearchRegionsParams,
  SearchRegionsResult
>
