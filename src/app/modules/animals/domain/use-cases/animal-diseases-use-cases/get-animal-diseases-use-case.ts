import type { AnimalDiseaseModel } from '../../models/animal-diseases-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalDiseasesUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    queryParams: ListParams<keyof AnimalDiseaseModel>
  },
  ListResponse<AnimalDiseaseModel>
>
