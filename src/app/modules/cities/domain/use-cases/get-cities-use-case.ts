import type { CityModel } from '../models/cities-model'
import type {
  RequestInterface,
  ListResponse,
  SearchParams,
} from '@/core/domain/types'

export type GetCitiesParams = SearchParams

export type GetCitiesUseCase = RequestInterface<
  GetCitiesParams,
  ListResponse<CityModel>
>
