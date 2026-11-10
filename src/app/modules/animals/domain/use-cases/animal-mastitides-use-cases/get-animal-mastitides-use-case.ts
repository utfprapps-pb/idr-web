import type { AnimalMastitisModel } from '../../models/animal-mastitides-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalMastitidesUseCase = RequestInterface<
  ListParams<AnimalMastitisModel> & { propertyId: string; animalId: string },
  ListResponse<AnimalMastitisModel>
>
