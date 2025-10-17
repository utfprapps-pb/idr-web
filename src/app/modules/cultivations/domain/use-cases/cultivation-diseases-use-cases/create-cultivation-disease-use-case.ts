import type { CultivationDiseaseDetailsModel } from '../../models/cultivation-diseases-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateCultivationDiseaseUseCase = RequestInterface<
  {
    propertyId: number
    cultivationDisease: CultivationDiseaseDetailsModel
  },
  void
>
