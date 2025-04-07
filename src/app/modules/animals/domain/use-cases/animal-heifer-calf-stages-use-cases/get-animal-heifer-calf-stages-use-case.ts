import type { AnimalHeiferCalfStageModel } from '../../models/animal-heifer-calf-stages-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalHeiferCalfStagesUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    queryParams: ListParams<keyof AnimalHeiferCalfStageModel>
  },
  ListResponse<AnimalHeiferCalfStageModel>
>
