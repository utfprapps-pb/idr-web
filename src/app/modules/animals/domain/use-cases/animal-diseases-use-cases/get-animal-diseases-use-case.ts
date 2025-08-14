import type { AnimalDiseaseModel } from '../../models/animal-diseases-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalDiseasesUseCase = RequestInterface<
  ListParams<AnimalDiseaseModel> & {
    propertyId: number
    animalId: number
  },
  ListResponse<AnimalDiseaseModel>
>
