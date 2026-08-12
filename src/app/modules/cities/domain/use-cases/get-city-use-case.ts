import type { CityDetailsModel } from '../models/cities-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetCityUseCase = RequestInterface<string, CityDetailsModel>
