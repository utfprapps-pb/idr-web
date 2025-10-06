import type { AnimalMedicationDetailsModel } from '../../models/animal-medications-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalMedicationUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  AnimalMedicationDetailsModel
>
