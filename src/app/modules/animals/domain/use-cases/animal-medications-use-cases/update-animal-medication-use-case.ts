import type { AnimalMedicationDetailsModel } from '../../models/animal-medications-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateAnimalMedicationUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalMedication: { id: string } & AnimalMedicationDetailsModel
  },
  void
>
