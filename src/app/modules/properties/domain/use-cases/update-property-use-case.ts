import type { PropertyDetailsModel } from '../models/properties-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdatePropertyUseCase = RequestInterface<
  WithId<PropertyDetailsModel>,
  void
>
