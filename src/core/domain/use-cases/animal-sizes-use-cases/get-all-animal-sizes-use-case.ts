import type { AnimalSizeModel } from '../../models/animal-sizes-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAllAnimalSizesUseCase = RequestInterface<
  ListParams<AnimalSizeModel>,
  ListResponse<AnimalSizeModel>
>
