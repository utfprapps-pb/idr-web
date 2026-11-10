import type { AnimalDiseaseDetailsModel } from '../../models/animal-diseases-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateAnimalDiseaseUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalDisease: { id: string } & AnimalDiseaseDetailsModel
  },
  void
>
