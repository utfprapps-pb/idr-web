import type { GeneralCultivationModel } from '../../models/general-cultivations-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetGeneralCultivationsUseCase = RequestInterface<
  ListParams<GeneralCultivationModel>,
  ListResponse<GeneralCultivationModel>
>
