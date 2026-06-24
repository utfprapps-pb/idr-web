import type { CityModel } from '../../models/city-model'
import type { RequestInterface } from '@/core/domain/types'

export type SearchCitiesParams = {
  terms?: string
  page?: number
  perPage?: number
}

export type SearchCitiesResult = {
  items: CityModel[]
  total: number
}

export type SearchCitiesUseCase = RequestInterface<
  SearchCitiesParams,
  SearchCitiesResult
>
