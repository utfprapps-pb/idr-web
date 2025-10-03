import type { AnimalMedicationModel } from '../../models/animal-medications-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalMedicationsUseCase = RequestInterface<
  ListParams<AnimalMedicationModel> & { propertyId: number; animalId: number },
  ListResponse<AnimalMedicationModel>
>
