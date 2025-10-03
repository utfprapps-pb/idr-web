import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalMedicationUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  void
>
