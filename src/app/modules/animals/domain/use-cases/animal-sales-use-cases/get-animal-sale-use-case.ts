import type { AnimalSaleDetailsModel } from '../../models/animal-sales-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalSaleUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  AnimalSaleDetailsModel
>
