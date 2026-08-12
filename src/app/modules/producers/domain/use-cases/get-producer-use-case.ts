import type { ProducerDetailsModel } from '../models/producers-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetProducerUseCase = RequestInterface<string, ProducerDetailsModel>
