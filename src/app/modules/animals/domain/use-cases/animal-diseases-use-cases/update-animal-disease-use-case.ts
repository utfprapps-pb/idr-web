import type { AnimalDiseaseDetailsModel } from '../../models/animal-diseases-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalDiseaseUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalDisease: WithId<AnimalDiseaseDetailsModel>
  },
  void
>
