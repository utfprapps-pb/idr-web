import type { AnimalMedicationDetailsModel } from '../../models/animal-medications-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalMedicationUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalMedication: AnimalMedicationDetailsModel
  },
  void
>
