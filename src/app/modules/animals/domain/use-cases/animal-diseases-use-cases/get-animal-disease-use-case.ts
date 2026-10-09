import type { AnimalDiseaseDetailsModel } from '../../models/animal-diseases-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalDiseaseUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  AnimalDiseaseDetailsModel
>
