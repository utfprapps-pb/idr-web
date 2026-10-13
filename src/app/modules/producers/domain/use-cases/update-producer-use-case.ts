import type { ProducerDetailsModel } from '../models/producers-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateProducerUseCase = RequestInterface<
  ProducerDetailsModel & { id: string },
  void
>
