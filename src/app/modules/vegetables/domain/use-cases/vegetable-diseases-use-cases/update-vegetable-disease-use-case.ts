import type { VegetableDiseaseDetailsModel } from '../../models/vegetable-diseases-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateVegetableDiseaseUseCase = RequestInterface<
  {
    propertyId: number
    vegetableDisease: WithId<VegetableDiseaseDetailsModel>
  },
  void
>
