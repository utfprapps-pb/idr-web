import type { AnimalChildbirthModel } from '../../models/animal-childbirths-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalChildbirthsUseCase = RequestInterface<
  ListParams<AnimalChildbirthModel> & { propertyId: number; animalId: number },
  ListResponse<AnimalChildbirthModel>
>
