import type { AnimalDiseaseDetailsModel } from '../../models/animal-diseases-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalDiseaseUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalDisease: AnimalDiseaseDetailsModel
  },
  void
>
