import type { InputUseLocationModel } from '../../models/input-use-locations-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetInputUseLocationsUseCase = RequestInterface<
  ListParams<InputUseLocationModel>,
  ListResponse<InputUseLocationModel>
>
