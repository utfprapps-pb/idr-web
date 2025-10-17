import type { CultivationDiseaseDetailsModel } from '../../models/cultivation-diseases-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetCultivationDiseaseUseCase = RequestInterface<
  {
    propertyId: number
    id: number
  },
  CultivationDiseaseDetailsModel
>
