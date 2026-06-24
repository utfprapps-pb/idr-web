import type { ProducerModel } from '../models/producers-model'
import type { RequestInterface, ListResponse } from '@/core/domain/types'

export type GetProducersParams = {
  terms?: string
  page?: number
  perPage?: number
}

export type GetProducersUseCase = RequestInterface<
  GetProducersParams,
  ListResponse<ProducerModel>
>
