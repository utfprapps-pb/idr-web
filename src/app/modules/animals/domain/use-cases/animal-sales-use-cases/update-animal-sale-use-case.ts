import type { AnimalSaleDetailsModel } from '../../models/animal-sales-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateAnimalSaleUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalSale: { id: string } & AnimalSaleDetailsModel
  },
  void
>
