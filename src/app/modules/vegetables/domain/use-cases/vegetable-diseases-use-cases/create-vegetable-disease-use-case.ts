import type { VegetableDiseaseDetailsModel } from '../../models/vegetable-diseases-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateVegetableDiseaseUseCase = RequestInterface<
  {
    propertyId: number
    vegetableDisease: VegetableDiseaseDetailsModel
  },
  void
>
