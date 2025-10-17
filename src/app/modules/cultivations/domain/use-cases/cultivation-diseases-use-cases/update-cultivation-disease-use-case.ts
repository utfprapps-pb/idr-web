import type { CultivationDiseaseDetailsModel } from '../../models/cultivation-diseases-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateCultivationDiseaseUseCase = RequestInterface<
  {
    propertyId: number
    cultivationDisease: WithId<CultivationDiseaseDetailsModel>
  },
  void
>
