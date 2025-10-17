import type { GeneralCultivationDiseaseDetailsModel } from '../../models/general-cultivation-diseases-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateGeneralCultivationDiseaseUseCase = RequestInterface<
  {
    generalCultivationDisease: GeneralCultivationDiseaseDetailsModel
  },
  void
>
