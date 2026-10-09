import type { AnimalSaleDetailsModel } from '../../models/animal-sales-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalSaleUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalSale: AnimalSaleDetailsModel
  },
  void
>
