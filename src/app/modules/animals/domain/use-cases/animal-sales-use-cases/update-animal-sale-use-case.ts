import type { AnimalSaleDetailsModel } from '../../models/animal-sales-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalSaleUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalSale: WithId<AnimalSaleDetailsModel>
  },
  void
>
