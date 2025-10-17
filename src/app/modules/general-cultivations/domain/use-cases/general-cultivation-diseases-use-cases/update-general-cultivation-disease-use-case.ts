import type { GeneralCultivationDiseaseDetailsModel } from '../../models/general-cultivation-diseases-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateGeneralCultivationDiseaseUseCase = RequestInterface<
  {
    generalCultivationDisease: WithId<GeneralCultivationDiseaseDetailsModel>
  },
  void
>
