import type { AnimalInseminationModel } from '../../models/animal-inseminations-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalInseminationsUseCase = RequestInterface<
  ListParams<AnimalInseminationModel> & {
    propertyId: number
    animalId: number
  },
  ListResponse<AnimalInseminationModel>
>
