import type { CityDetailsModel } from '../models/cities-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateCityUseCase = RequestInterface<CityDetailsModel, void>
