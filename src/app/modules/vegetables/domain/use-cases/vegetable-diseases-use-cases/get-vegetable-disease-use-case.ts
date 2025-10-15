import type { VegetableDiseaseDetailsModel } from '../../models/vegetable-diseases-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetVegetableDiseaseUseCase = RequestInterface<
  {
    propertyId: number
    id: number
  },
  VegetableDiseaseDetailsModel
>
