import type { ProducerDetailsModel } from '../models/producers-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateProducerUseCase = RequestInterface<ProducerDetailsModel, void>
