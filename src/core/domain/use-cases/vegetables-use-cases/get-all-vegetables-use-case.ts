import type { VegetableModel } from '../../models/vegetables-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAllVegetablesUseCase = RequestInterface<
  ListParams<VegetableModel>,
  ListResponse<VegetableModel>
>
