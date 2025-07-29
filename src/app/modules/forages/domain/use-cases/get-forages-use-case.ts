import type { ForageModel } from '../models/forages-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetForagesUseCase = RequestInterface<
  ListParams<ForageModel> & { propertyId: string },
  ListResponse<ForageModel>
>
