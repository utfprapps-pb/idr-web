import type { ImprovementModel } from '../models/improvements-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetImprovementsUseCase = RequestInterface<
  {
    propertyId: string
    queryParams: ListParams<keyof ImprovementModel>
  },
  ListResponse<ImprovementModel>
>
