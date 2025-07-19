import type { AnimalPregnancyDiagnosisModel } from '../../models/animal-pregnancy-diagnoses-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalPregnancyDiagnosesUseCase = RequestInterface<
  ListParams<AnimalPregnancyDiagnosisModel> & {
    propertyId: number
    animalId: number
  },
  ListResponse<AnimalPregnancyDiagnosisModel>
>
