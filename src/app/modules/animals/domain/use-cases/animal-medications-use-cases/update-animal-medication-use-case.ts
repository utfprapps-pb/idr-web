import type { AnimalMedicationDetailsModel } from '../../models/animal-medications-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalMedicationUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalMedication: WithId<AnimalMedicationDetailsModel>
  },
  void
>
