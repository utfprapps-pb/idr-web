import type { ImprovementModel } from '../models/improvements-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetImprovementsUseCase = RequestInterface<
  ListParams<ImprovementModel> & { propertyId: number },
  ListResponse<ImprovementModel>
>
