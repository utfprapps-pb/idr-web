import type { GeneralCultivationPestModel } from '../../models/general-cultivation-pests-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetGeneralCultivationPestsUseCase = RequestInterface<
  ListParams<GeneralCultivationPestModel>,
  ListResponse<GeneralCultivationPestModel>
>
