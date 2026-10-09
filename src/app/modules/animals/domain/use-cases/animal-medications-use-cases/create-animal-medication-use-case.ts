import type { AnimalMedicationDetailsModel } from '../../models/animal-medications-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalMedicationUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalMedication: AnimalMedicationDetailsModel
  },
  void
>
