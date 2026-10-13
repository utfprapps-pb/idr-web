import type { PropertyDetailsModel } from '../models/properties-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdatePropertyUseCase = RequestInterface<
  PropertyDetailsModel & { id: string; removeAttachmentIds?: string[] },
  void
>
