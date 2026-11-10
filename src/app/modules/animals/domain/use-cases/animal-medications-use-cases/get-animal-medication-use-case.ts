import type { AnimalMedicationDetailsModel } from '../../models/animal-medications-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalMedicationUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  AnimalMedicationDetailsModel
>
