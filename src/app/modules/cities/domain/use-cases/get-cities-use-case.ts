import type { CityModel } from '../models/cities-model'
import type { RequestInterface, ListResponse } from '@/core/domain/types'

export type GetCitiesParams = {
  terms?: string
  page?: number
  perPage?: number
}

export type GetCitiesUseCase = RequestInterface<
  GetCitiesParams,
  ListResponse<CityModel>
>
