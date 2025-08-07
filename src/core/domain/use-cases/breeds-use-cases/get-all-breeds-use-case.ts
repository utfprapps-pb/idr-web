import type { BreedModel } from '../../models/breeds-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAllBreedsUseCase = RequestInterface<
  ListParams<BreedModel>,
  ListResponse<BreedModel>
>
