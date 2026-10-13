import type { ProducerModel } from '../models/producers-model'
import type {
  RequestInterface,
  ListResponse,
  SearchParams,
} from '@/core/domain/types'

export type GetProducersParams = SearchParams

export type GetProducersUseCase = RequestInterface<
  GetProducersParams,
  ListResponse<ProducerModel>
>
