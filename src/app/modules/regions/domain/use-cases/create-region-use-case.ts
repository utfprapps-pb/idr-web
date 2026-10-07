import type { RegionDetailsModel } from '../models/regions-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateRegionUseCase = RequestInterface<RegionDetailsModel, void>
